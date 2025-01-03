from fastapi import UploadFile, File
from PIL import Image
import numpy as np

from VGG19 import VGG19_model
from InceptionV3 import InceptionV3_model


weights_file_vgg = "vgg19.weights.h5"

vgg19 = VGG19_model(30,weights_file_vgg)
vgg19.load_weights("vgg19.keras")

weights_file_inception = "inceptionv3.weights.h5"

inception_model = InceptionV3_model(30,weights_file_inception)
inception_model.load_weights("inceptionv3.keras")


class_index_to_label = {
    0: 'Cherry', 1: 'Coffee-plant', 2: 'Cucumber', 3: 'Fox_nut(Makhana)',
    4: 'Lemon', 5: 'Olive-tree', 6: 'Pearl_millet(bajra)', 7: 'Tobacco-plant',
    8: 'almond', 9: 'banana', 10: 'cardamom', 11: 'chilli', 12: 'clove', 
    13: 'coconut', 14: 'cotton', 15: 'gram', 16: 'jowar', 17: 'jute', 
    18: 'maize', 19: 'mustard-oil', 20: 'papaya', 21: 'pineapple', 
    22: 'rice', 23: 'soyabean', 24: 'sugarcane', 25: 'sunflower', 
    26: 'tea', 27: 'tomato', 28: 'vigna-radiati(Mung)', 29: 'wheat'
}

def preprocess_image(file):
    # Load and preprocess the image
    image = Image.open(file)
    image = image.resize((300, 300))
    img_array = np.array(image)
    img_array = img_array / 255.0  # Normalize pixel values to [0, 1]
    return img_array

def predict_single_image(file, model):
    img_array = preprocess_image(file)
    img_array = np.expand_dims(img_array, axis=0)
    predictions = model.predict(img_array)
    predicted_label_index = np.argmax(predictions, axis=1)[0]
    predicted_label = class_index_to_label[predicted_label_index]
    return predicted_label, np.max(predictions)

async def classify_crop(file: UploadFile = File(...)):
    predicted_class1, _ = predict_single_image(file.file, vgg19)
    predicted_class2, _ = predict_single_image(file.file, inception_model)
    print(predicted_class1, predicted_class2)
    return {"predicted_class_vgg19": predicted_class1, "predicted_class_inception": predicted_class2}

#