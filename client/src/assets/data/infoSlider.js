export const content = {
  models: {
    mnist: `MNIST is a model trained to recognize handwritten digits from 0 to 9. It is commonly used as a beginner-friendly dataset in machine learning and computer vision.The input images are small (28x28 pixels), grayscale, and consist of centered, handwritten digits. The simplicity of this dataset makes it ideal for demonstrating basic neural network techniques.`,

    mobilenetv2: `MobileNetV2 is a lightweight deep learning model optimized for mobile and embedded vision applications. It was trained on the ImageNet dataset, which contains over a million real-world images across 1,000 classes.\n\nThanks to its efficiency and small size, MobileNetV2 is well-suited for running on devices with limited computing power without sacrificing too much accuracy.`,

    resnet50: `ResNet50 is a deep convolutional neural network with 50 layers. What makes it unique is its use of "residual connections", which help solve the vanishing gradient problem in deep networks.\n\nResNet50 is highly accurate and widely used for tasks like image classification, object detection, and feature extraction. It was also trained on ImageNet.`,

    vgg16: `VGG16 is a deep convolutional neural network with 16 layers, known for its uniform architecture — using many small (3x3) filters stacked together.\n\nAlthough it's computationally heavy, VGG16 achieves high accuracy and is frequently used for transfer learning. Like other models, it was trained on the ImageNet dataset.`,
  },

  attacks: {
    fgsm: `FGSM (Fast Gradient Sign Method) is one of the simplest adversarial attacks. It works by making a small change to each pixel in the direction that increases the model's prediction error.\n\nEven though the changes are nearly invisible to the human eye, they can cause the model to make incorrect predictions.`,

    pgd: `PGD (Projected Gradient Descent) is an iterative version of FGSM. Instead of taking one big step, it takes several small steps, adjusting the image a little at a time.\n\nAfter each step, it "projects" the modified image back into a valid range to ensure the changes remain subtle. PGD is a stronger and more reliable attack.`,

    bim: `BIM (Basic Iterative Method) is very similar to PGD. It repeatedly applies small perturbations using the gradient of the loss function.\n\nLike PGD, BIM ensures the modified image doesn't change too drastically. This makes the attack more powerful than FGSM while keeping the adversarial examples visually similar to the originals.`,
  },
};
