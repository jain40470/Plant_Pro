from fastapi import FastAPI, File, UploadFile
from PIL import Image
import numpy as np
from io import BytesIO
import tensorflow as tf
from tensorflow.keras.applications.inception_v3 import preprocess_input
from seed_stagemodel import seedstages

app = FastAPI()

# Load the pre-trained model

weights_file = "inceptionv3.weights.h5"

model = seedstages(weights_file )
model.load_weights("seedstage.keras")

# Define image size and classes
image_size = (256, 256)
classes = ['Immature soybeans',
 'Intact soybeans',
 'Skin-damaged soybeans',
 'Spotted soybeans',
 'Broken soybeans']

def preprocess_image(image):
    img = Image.open(BytesIO(image))
    img = img.resize(image_size)
    img_array = np.array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)
    return img_array

async def seed_stage(file: UploadFile = File(...)):
    contents = await file.read()
    processed_image = preprocess_image(contents)
    predictions = model.predict(processed_image)
    predicted_class_index = np.argmax(predictions)
    predicted_class = classes[predicted_class_index]
    print(predicted_class)
    return {"stage": predicted_class}

#