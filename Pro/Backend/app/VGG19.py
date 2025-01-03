import os
import tensorflow as tf
from tensorflow.keras.applications import VGG19
from tensorflow.keras import layers

def save_VGG19_weights(file_path):
    # Load the VGG19 model without the top layer (weights are automatically downloaded)
    base_model_vgg19 = VGG19(
        include_top=False,
        weights='imagenet',
        pooling='avg'
    )
    # Save the weights to a file
    base_model_vgg19.save_weights(file_path)
    print("VGG19 weights saved successfully to:", file_path)

def load_VGG19_weights(file_path):
    # Load the VGG19 model without the top layer
    base_model_vgg19 = VGG19(
        include_top=False,
        weights=None,
        pooling='avg'
    )
    # Load the weights from the file
    base_model_vgg19.load_weights(file_path)
    print("VGG19 weights loaded successfully from:", file_path)
    return base_model_vgg19

def VGG19_model(output_layer, weights_file=None):
    if weights_file is not None and os.path.exists(weights_file):
        # Load the VGG19 model with pre-trained weights from the specified file
        base_model_vgg19 = load_VGG19_weights(weights_file)
    else:
        # Load the VGG19 model with pre-trained weights from ImageNet
        base_model_vgg19 = VGG19(
            input_shape=(300, 300, 3),
            include_top=False,
            weights='imagenet',
            pooling='avg'
        )
        # Save the weights to a file for future use
        if weights_file is not None:
            save_VGG19_weights(weights_file)

    base_model_vgg19.trainable = False

    # Define the rest of the model
    x = base_model_vgg19.output
    x = layers.Dense(100, activation='tanh')(x)
    x = layers.Dense(500, activation='tanh')(x)
    x = layers.Dense(output_layer, activation='softmax')(x)

    vgg_model_19 = tf.keras.models.Model(base_model_vgg19.input, x)
    opt = tf.keras.optimizers.Adam(learning_rate=0.0006)

    vgg_model_19.compile(optimizer=opt, loss='categorical_crossentropy', metrics=['accuracy'])
    return vgg_model_19

# Specify the file path where you want to save/load the weights
weights_file = "vgg19.weights.h5"

# Example usage:
# model = VGG19_model(output_layer=10, weights_file=weights_file)
