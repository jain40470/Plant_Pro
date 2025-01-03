import pickle
import numpy as np
from pydantic import BaseModel
from lstm import lstm

# Load scaler and label encoder

with open('scaler.pkl', 'rb') as f:
    scaler = pickle.load(f)

with open('label_encoder.pkl', 'rb') as f:
    label_encoder = pickle.load(f)

# Load LSTM model
lstm_model = lstm()
lstm_model.load_weights("lstm.keras")

class InputData(BaseModel):
    Crop_Year: int
    Crop: str
    State: str
    Season: str
    Area: float
    Production: float
    Annual_Rainfall: float
    Fertilizer: float
    Pesticide: float

class OutputData(BaseModel):
    Yield_scaled: float

async def predict_yields(data: InputData):

    print(data)

    # Transform incoming data
    crop_encoded = label_encoder.transform([data.Crop])[0]
    season_encoded = label_encoder.transform([data.Season])[0]
    state_encoded = label_encoder.transform([data.State])[0]
    
    # Scale new data
    new_data = np.array([[data.Crop_Year, data.Area, data.Production, data.Annual_Rainfall, data.Fertilizer, data.Pesticide, 0]])
    scaled_data = scaler.transform(new_data)
    
    features = np.array([
        scaled_data[0][0],  # Crop_Year
        crop_encoded,
        state_encoded,
        scaled_data[0][1],  # Area
        scaled_data[0][2],  # Production
        scaled_data[0][3],  # Annual_Rainfall
        scaled_data[0][4]   # Fertilizer
    ])
    
    features = features.reshape((1, 1, len(features)))
    
    # Make prediction using loaded LSTM model
    prediction = lstm_model.predict(features)

    predictions = np.zeros((1, 7))
    predictions[0][0] = prediction[0][0]
    prediction_inverse = scaler.inverse_transform(predictions)[0][0]
    
    return {"Yield_scaled": prediction_inverse}
