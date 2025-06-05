# Adversarial Attack Flask App with FGSM, PGD, BIM, and C&W

from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import numpy as np
import tensorflow as tf
from PIL import Image
import io
import base64
import uuid
import os
import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('Agg')

HEATMAP_FOLDER = 'static/heatmaps'
os.makedirs(HEATMAP_FOLDER, exist_ok=True)

from tensorflow.keras.applications.mobilenet_v2 import (
    MobileNetV2,
    preprocess_input as mobilenet_preprocess,
    decode_predictions as mobilenet_decode
)
from tensorflow.keras.applications.resnet50 import (
    ResNet50,
    preprocess_input as resnet_preprocess,
    decode_predictions as resnet_decode
)
from tensorflow.keras.applications.vgg16 import (
    VGG16,
    preprocess_input as vgg_preprocess,
    decode_predictions as vgg_decode
)

app = Flask(__name__, template_folder="templates")
CORS(app)

# Load models
mnist_model = tf.keras.models.load_model("models/mnist_model.h5")
imagenet_model = MobileNetV2(weights="imagenet")
resnet_model = ResNet50(weights="imagenet")
vgg_model = VGG16(weights="imagenet")

# Model configuration
MODEL_CONFIG = {
    'mnist': {
        'preprocess': lambda x: x / 255.0,
        'decode': lambda x: [(str(i), str(prob)) for i, prob in enumerate(x[0])],
        'input_size': (28, 28),
        'model': mnist_model
    },
    'imagenet': {
        'preprocess': mobilenet_preprocess,
        'decode': mobilenet_decode,
        'input_size': (224, 224),
        'model': imagenet_model
    },
    'resnet50': {
        'preprocess': resnet_preprocess,
        'decode': resnet_decode,
        'input_size': (224, 224),
        'model': resnet_model
    },
    'vgg16': {
        'preprocess': vgg_preprocess,
        'decode': vgg_decode,
        'input_size': (224, 224),
        'model': vgg_model
    }
}
def generate_heatmap(original, adversarial):
    diff = np.abs(adversarial - original)
    diff = np.squeeze(diff)

    if diff.shape[-1] == 1:  # Grayscale
        diff = diff[:, :, 0]

    # Normalize diff to [0, 1]
    diff -= diff.min()
    if diff.max() != 0:
        diff /= diff.max()

    plt.figure(figsize=(3, 3))
    plt.imshow(diff, cmap='hot')
    plt.axis('off')

    filename = f"{uuid.uuid4().hex}.png"
    filepath = os.path.join(HEATMAP_FOLDER, filename)

    plt.savefig(filepath, format='png', bbox_inches='tight', pad_inches=0)
    plt.close()

    return f"/{filepath}"


def fgsm_attack(image, model, epsilon, is_imagenet=False):
    image = tf.Variable(image)
    with tf.GradientTape() as tape:
        tape.watch(image)
        prediction = model(image)
        label = tf.argmax(prediction[0])
        label_tensor = tf.convert_to_tensor([int(label)], dtype=tf.int32)
        loss = tf.keras.losses.sparse_categorical_crossentropy(label_tensor, prediction)

    gradient = tape.gradient(loss, image)
    signed_grad = tf.sign(gradient)
    adv_image = image + epsilon * signed_grad
    return tf.clip_by_value(adv_image, -1 if is_imagenet else 0, 1).numpy()

def pgd_attack(image, model, epsilon, alpha, num_iter, is_imagenet=False):
    adv_image = tf.Variable(image)
    orig_image = image.copy()
    for _ in range(num_iter):
        with tf.GradientTape() as tape:
            tape.watch(adv_image)
            prediction = model(adv_image)
            label = tf.argmax(prediction[0])
            loss = tf.keras.losses.sparse_categorical_crossentropy(tf.expand_dims(label, 0), prediction)

        gradient = tape.gradient(loss, adv_image)
        adv_image.assign_add(alpha * tf.sign(gradient))
        adv_image.assign(tf.clip_by_value(adv_image, orig_image - epsilon, orig_image + epsilon))
        adv_image.assign(tf.clip_by_value(adv_image, -1 if is_imagenet else 0, 1))
    return adv_image.numpy()

def bim_attack(image, model, epsilon, alpha, num_iter, is_imagenet=False):
    adv_image = tf.Variable(image)
    for _ in range(num_iter):
        with tf.GradientTape() as tape:
            tape.watch(adv_image)
            prediction = model(adv_image)
            label = tf.argmax(prediction[0])
            loss = tf.keras.losses.sparse_categorical_crossentropy(tf.expand_dims(label, 0), prediction)
        gradient = tape.gradient(loss, adv_image)
        adv_image.assign_add(alpha * tf.sign(gradient))
        adv_image.assign(tf.clip_by_value(adv_image, image - epsilon, image + epsilon))
        adv_image.assign(tf.clip_by_value(adv_image, -1 if is_imagenet else 0, 1))
    return adv_image.numpy()

def array_to_base64(img_array, model_type):
    if model_type == "mnist":
        img = Image.fromarray((img_array[0,:,:,0] * 255).astype(np.uint8))
    else:
        img_array = ((img_array[0] + 1.0) * 127.5).astype(np.uint8) if 'vgg' not in model_type else (img_array[0] + [103.939, 116.779, 123.68]).astype(np.uint8)
        img = Image.fromarray(img_array)
    buffered = io.BytesIO()
    img.save(buffered, format="PNG")
    return base64.b64encode(buffered.getvalue()).decode('utf-8')

@app.route('/predict', methods=['POST'])
def predict():
    model_type = request.form['model']
    attack_type = request.form['attack']
    file = request.files['image']

    config = MODEL_CONFIG.get(model_type)
    if not config:
        return jsonify({"error": "Invalid model type"}), 400

    img = Image.open(file).convert("RGB" if model_type != "mnist" else "L")
    img = img.resize(config['input_size'])
    img_array = np.array(img).astype("float32")

    preprocessed = config['preprocess'](img_array)
    input_tensor = tf.convert_to_tensor(preprocessed.reshape((1, *config['input_size'], 3 if model_type != "mnist" else 1)))

    original_pred = config['model'].predict(input_tensor)
    original_decoded = config['decode'](original_pred)[0][0]

    is_imagenet = model_type != "mnist"
    epsilon = 0.01 if is_imagenet else 0.1
    alpha = 0.005
    num_iter = 10

    attack_type = attack_type.lower()
    if attack_type == 'fgsm':
        adv_img = fgsm_attack(input_tensor.numpy(), config['model'], epsilon, is_imagenet)
    elif attack_type == 'pgd':
        adv_img = pgd_attack(input_tensor.numpy(), config['model'], epsilon, alpha, num_iter, is_imagenet)
    elif attack_type == 'bim':
        adv_img = bim_attack(input_tensor.numpy(), config['model'], epsilon, alpha, num_iter, is_imagenet)
    else:
        return jsonify({"error": "Unsupported attack type"}), 400

    adv_prediction = config['model'].predict(adv_img)
    adv_decoded = config['decode'](adv_prediction)[0][0]

    adv_img_base64 = array_to_base64(adv_img, model_type)
    heatmap_path = generate_heatmap(input_tensor.numpy(), adv_img)


    if model_type == "mnist":
        response = {
            "original_prediction": int(original_decoded[0]),
            "adversarial_prediction": int(adv_decoded[0]),
            "model_type": model_type,
            "attack_type": attack_type,
            "adversarial_image": adv_img_base64,
            "heatmap_image": heatmap_path
        }
    else:
        response = {
            "original_prediction": {
                "class_name": original_decoded[1],
                "probability": float(original_decoded[2])
            },
            "adversarial_prediction": {
                "class_name": adv_decoded[1],
                "probability": float(adv_decoded[2])
            },
            "original_confidence": float(original_decoded[2]),
            "adversarial_confidence": float(adv_decoded[2]),
            "model_type": model_type,
            "attack_type": attack_type,
            "adversarial_image": adv_img_base64,
            "heatmap_image": heatmap_path
        }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
