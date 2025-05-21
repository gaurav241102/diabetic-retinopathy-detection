from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from model import load_model, predict_image
from io import BytesIO
from PIL import Image, UnidentifiedImageError
import uvicorn
import logging
from typing import Dict, Any
import os

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Diabetic Retinopathy Detection API",
    description="API for detecting diabetic retinopathy from retinal fundus images",
    version="1.0.0"
)

# Configure CORS
origins = [
    "http://localhost:3000",  # Local development
    "http://localhost:5173",  # Vite dev server
    "https://retinascan.vercel.app",  # Vercel URL
    "https://*.vercel.app",  # All Vercel deployments
    "https://retinascan-backend.onrender.com",  # Render backend
    "https://*.onrender.com",  # All Render deployments
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# Load model at startup
@app.on_event("startup")
async def load_model_on_startup():
    try:
        global model
        model_path = os.getenv("MODEL_PATH", "models/trained_model.pth")
        logger.info(f"Loading model from {model_path}")
        if not os.path.exists(model_path):
            logger.error(f"Model file not found at {model_path}")
            raise FileNotFoundError(f"Model file not found at {model_path}")
        model = load_model(model_path)
        logger.info("Model loaded successfully")
    except Exception as e:
        logger.error(f"Failed to load model: {str(e)}")
        raise

# Health check endpoint
@app.get("/health")
async def health_check() -> Dict[str, str]:
    return {"status": "healthy", "backend": "local-python-backend"}

# Prediction endpoint
@app.post("/predict/")
async def predict(file: UploadFile = File(...)) -> Dict[str, Any]:
    # Validate file type
    if not file.filename.lower().endswith((".jpg", ".jpeg", ".png")):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload a JPG or PNG image.")
    
    try:
        # Read and process the image
        contents = await file.read()
        if not contents:
            raise HTTPException(status_code=400, detail="Empty file")
            
        try:
            image = Image.open(BytesIO(contents)).convert("RGB")
        except UnidentifiedImageError:
            raise HTTPException(status_code=400, detail="Invalid image file")
        
        # Make prediction
        result = predict_image(image, model)
        logger.info(f"Prediction result: {result}")
        
        # Ensure we return the expected format
        response = {
            "grade": result["grade"],
            "confidence": result["confidence"],
            "class_probabilities": result["class_probabilities"],
            "backend": "local-python-backend"  # Add this line to identify our backend
        }
        
        return response
        
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
