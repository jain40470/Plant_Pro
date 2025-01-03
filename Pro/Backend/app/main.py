from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from crop_classifier import classify_crop
from plant_disease_classifier import plant_disease
from seedstage_classifier import seed_stage
from yield_prediction import predict_yields
from yield_prediction import InputData,OutputData
from pydantic import BaseModel

from transformers import pipeline
import nltk
nltk.download('punkt')

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


generator = pipeline('text-generation', model='benkimz/agbrain')

def generate_response(input_text, max_length=120):
    response = generator(input_text, max_length=max_length, num_return_sequences=1)[0]['generated_text']
    # Remove initial message prefix
    response = response.replace("message=", "")
    # Tokenize the response into sentences
    sentences = nltk.sent_tokenize(response)
    # Filter out incomplete sentences
    complete_sentences = [sentence for sentence in sentences if sentence.endswith('.') or sentence.endswith('!') or sentence.endswith('?')]
    # Join the complete sentences into a single string
    final_response = ' '.join(complete_sentences)
    return final_response


class Message(BaseModel):
    message: str

@app.post("/api/chatbot")
async def chatbot(message: Message):
    print(message)
    response = generate_response(str(message))
    return {"response": response}

@app.post("/api/classify")
async def classify_image(file: UploadFile = File(...)):
    return await classify_crop(file)

@app.post("/api/seedstage")
async def seedstage(file: UploadFile = File(...)):
    return await seed_stage(file)

@app.post("/api/plantdisease")
async def plantdisease(file: UploadFile = File(...)):
    return await plant_disease(file)

@app.post("/api/predict",response_model=OutputData)
async def predict_yield(data: InputData):    # https://fastapi-agriproject1.onrender.com
    return await predict_yields(data)