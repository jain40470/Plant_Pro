import os
import tensorflow as tf
from tensorflow.keras import layers
from keras.layers import Dense, Flatten, GlobalAveragePooling2D
from tensorflow.keras.applications import InceptionV3

def save_InceptionV3_weights(file_path):
    base_model_inception = InceptionV3(
        input_shape=(300, 300, 3),
        include_top=False,
        weights='imagenet'
    )
    for layer in base_model_inception.layers:
        layer.trainable = False
    base_model_inception.save_weights(file_path)
    print("InceptionV3 weights saved successfully to:", file_path)

def load_InceptionV3_weights(file_path):
    base_model_inception = InceptionV3(
        input_shape=(300, 300, 3),
        include_top=False,
        weights=None
    )
    base_model_inception.load_weights(file_path)
    print("InceptionV3 weights loaded successfully from:", file_path)
    return base_model_inception

def InceptionV3_model(output_layer, weights_file=None):
    if weights_file is not None and os.path.exists(weights_file):
        base_model_inception = load_InceptionV3_weights(weights_file)
    else:
        base_model_inception = InceptionV3(
            input_shape=(300, 300, 3),
            include_top=False,
            weights='imagenet'
        )
        if weights_file is not None:
            save_InceptionV3_weights(weights_file)

    for layer in base_model_inception.layers:
        layer.trainable = False

    x = layers.Flatten()(base_model_inception.output)
    x = layers.Dense(64, activation='relu')(x)
    x = layers.Dropout(0.3)(x)
    x = layers.Dense(output_layer, activation='softmax')(x)

    inception_model = tf.keras.models.Model(base_model_inception.input, x)
    opt = tf.keras.optimizers.RMSprop(learning_rate=0.0001)

    inception_model.compile(optimizer=opt, loss='categorical_crossentropy', metrics=['accuracy'])
    return inception_model

# Specify the file path where you want to save/load the weights
weights_file = "inceptionv3.weights.h5"

# Example usage:
# inception_model = InceptionV3_model(output_layer=30, weights_file=weights_file)
