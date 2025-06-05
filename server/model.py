# save_model.py
import tensorflow as tf

# Load dataset
mnist = tf.keras.datasets.mnist
(x_train, y_train), (_, _) = mnist.load_data()
x_train = x_train / 255.0

# Define and train simple CNN model
model = tf.keras.models.Sequential([
    tf.keras.layers.Reshape((28, 28, 1), input_shape=(28, 28)),
    tf.keras.layers.Conv2D(32, kernel_size=3, activation='relu'),
    tf.keras.layers.MaxPooling2D(pool_size=2),
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
model.fit(x_train, y_train, epochs=3)

# Save model
model.save("models/mnist_model.h5")
