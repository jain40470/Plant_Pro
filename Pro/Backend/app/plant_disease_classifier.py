from fastapi import UploadFile, File
from PIL import Image
import numpy as np
import tensorflow as tf

from plant_disease import Vit

# Define class names for plant disease
class_names = ['Tomato___Late_blight', 'Tomato___healthy', 'Grape___healthy', 'Orange___Haunglongbing_(Citrus_greening)', 'Soybean___healthy', 'Squash___Powdery_mildew', 'Potato___healthy', 'Corn_(maize)___Northern_Leaf_Blight', 'Tomato___Early_blight', 'Tomato___Septoria_leaf_spot', 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 'Strawberry___Leaf_scorch', 'Peach___healthy', 'Apple___Apple_scab', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Bacterial_spot', 'Apple___Black_rot', 'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew', 'Peach___Bacterial_spot', 'Apple___Cedar_apple_rust', 'Tomato___Target_Spot', 'Pepper,_bell___healthy', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Potato___Late_blight', 'Tomato___Tomato_mosaic_virus', 'Strawberry___healthy', 'Apple___healthy', 'Grape___Black_rot', 'Potato___Early_blight', 'Cherry_(including_sour)___healthy', 'Corn_(maize)___Common_rust_', 'Grape___Esca_(Black_Measles)', 'Raspberry___healthy', 'Tomato___Leaf_Mold', 'Tomato___Spider_mites Two-spotted_spider_mite', 'Pepper,_bell___Bacterial_spot', 'Corn_(maize)___healthy']

# Load configuration for plant disease model
config = {
    "num_layers": 12,
    "hidden_dim": 600,
    "mlp_dim": 3072,
    "num_head": 12,
    "dropout_rate": 0.1,
    "num_patches": 64,
    "patch_size": 32,
    "num_channels": 3,
    "num_classes": len(class_names)
}

# Initialize and load weights for plant disease model
plant_disease_vit = Vit(config)
plant_disease_vit.load_weights("plant_disease.keras")

def preprocess_image_vit(file, image_size, patch_size):
    image = Image.open(file)
    image = image.resize((256, 256))
    patches = tf.image.extract_patches(images=tf.expand_dims(image, axis=0),
                                       sizes=[1, patch_size, patch_size, 1],
                                       strides=[1, patch_size, patch_size, 1],
                                       rates=[1, 1, 1, 1],
                                       padding='VALID')
    flattened_patches = tf.reshape(patches, [-1, patch_size * patch_size * 3])
    return flattened_patches

def predict_image_vit(file, model):
    image_size = 256
    image = preprocess_image_vit(file, image_size, config["patch_size"])
    image = np.expand_dims(image, axis=0)
    predictions = model.predict(image)
    return predictions

def predict_single_image_vit(file):
    predictions = predict_image_vit(file, plant_disease_vit)
    predicted_class = np.argmax(predictions, axis=1)
    return class_names[predicted_class[0]], np.max(predictions)

async def plant_disease(file: UploadFile = File(...)):
    predicted_class, _ = predict_single_image_vit(file.file)
    return {"predicted_class": predicted_class}
