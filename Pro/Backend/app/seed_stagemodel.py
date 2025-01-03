import os
import tensorflow as tf
from tensorflow.keras.applications import InceptionV3
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D

input_shape = (256, 256, 3)

def save_InceptionV3_weights(file_path):
    base_model = InceptionV3(weights='imagenet', include_top=False, input_shape=input_shape)
    for layer in base_model.layers:
        layer.trainable = False
    base_model.save_weights(file_path)
    print("InceptionV3 weights saved successfully to:", file_path)

def load_InceptionV3_weights(file_path):
    base_model = InceptionV3(weights=None, include_top=False, input_shape=input_shape)
    base_model.load_weights(file_path)
    print("InceptionV3 weights loaded successfully from:", file_path)
    return base_model

def seedstages(weights_file=None):
    if weights_file is not None and os.path.exists(weights_file):
        base_model = load_InceptionV3_weights(weights_file)
    else:
        base_model = InceptionV3(weights='imagenet', include_top=False, input_shape=input_shape)
        if weights_file is not None:
            save_InceptionV3_weights(weights_file)

    for layer in base_model.layers:
        layer.trainable = False

    x = base_model.output
    x = GlobalAveragePooling2D()(x)
    x = Dense(1024, activation='relu')(x)
    predictions = Dense(5, activation='softmax')(x)

    model = Model(inputs=base_model.input, outputs=predictions)
    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

    return model

weights_file = "inceptionv3.weights.h5"
