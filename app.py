from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import numpy as np
from sklearn.preprocessing import LabelEncoder
import tensorflow as tf
import io
import os
import h5py
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your Vercel frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Hardcode the label encoder classes
LABEL_ENCODER_CLASSES = np.array(['actinic keratosis', 'basal cell carcinoma', 'dermatofibroma',
                                 'melanoma', 'nevus', 'pigmented benign keratosis',
                                 'squamous cell carcinoma'])

def create_model():
    model = tf.keras.Sequential([
        tf.keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 3)),
        tf.keras.layers.MaxPooling2D((2, 2)),
        tf.keras.layers.Conv2D(64, (3, 3), activation='relu'),
        tf.keras.layers.MaxPooling2D((2, 2)),
        tf.keras.layers.Conv2D(64, (3, 3), activation='relu'),
        tf.keras.layers.Flatten(),
        tf.keras.layers.Dense(64, activation='relu'),
        tf.keras.layers.Dense(7, activation='softmax')
    ])
    return model

# Global variables for model and label encoder
model = None
le = None

def init_model():
    global model, le
    
    try:
        logger.info("Starting model initialization...")
        logger.info(f"Current working directory: {os.getcwd()}")
        logger.info(f"Files in current directory: {os.listdir('.')}")
        
        # Get the absolute path to the model file
        model_path = os.path.join(os.getcwd(), 'models', 'skin_lesion_model.h5')
        
        logger.info(f"Loading model from: {model_path}")
        
        # Create model with the same architecture
        model = create_model()
        
        # Load weights directly from h5 file
        logger.info("Loading model weights...")
        with h5py.File(model_path, 'r') as f:
            weight_names = [name.decode('utf8') for name in f.attrs['layer_names']]
            for i, name in enumerate(weight_names):
                g = f[name]
                weights = [np.array(g[wname]) for wname in g.attrs['weight_names']]
                model.layers[i].set_weights(weights)
        
        model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
        logger.info("Model loaded successfully")
        
        # Initialize label encoder with hardcoded classes
        logger.info("Initializing label encoder with hardcoded classes...")
        le = LabelEncoder()
        le.classes_ = LABEL_ENCODER_CLASSES
        logger.info("Label encoder initialized successfully")
        
        return True
    except Exception as e:
        logger.error(f"Error during initialization: {str(e)}")
        return False

# Initialize model at startup
if not init_model():
    logger.error("Failed to initialize model. Application may not work correctly.")

@app.get("/")
async def root():
    return {
        "message": "Oncoscopic ML API is running",
        "model_loaded": model is not None,
        "label_encoder_loaded": le is not None
    }

@app.post("/predict")
async def predict_image(file: UploadFile = File(...)):
    if model is None or le is None:
        return {"error": "Model or label encoder not initialized properly"}
        
    try:
        # Read image file
        contents = await file.read()
        img = Image.open(io.BytesIO(contents))
        
        # Convert to RGB if needed
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Resize to model input size
        img = img.resize((28, 28))
        
        # Convert to numpy array and normalize
        img_array = np.asarray(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        
        # Make prediction
        prediction = model.predict(img_array, verbose=0)
        predicted_class = le.classes_[np.argmax(prediction)]
        confidence = float(np.max(prediction) * 100)
        
        return {
            'predicted_class': predicted_class,
            'confidence': confidence
        }
        
    except Exception as e:
        logger.error(f"Error during prediction: {str(e)}")
        return {
            'error': str(e),
            'traceback': logging.traceback.format_exc()
        } 