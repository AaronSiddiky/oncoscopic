from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import numpy as np
from sklearn.preprocessing import LabelEncoder
import tensorflow as tf
import io
import os

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your Vercel frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

# Load model and label encoder at startup
print("Loading model and label encoder...")
try:
    # Create model with the same architecture
    model = create_model()
    
    # Load weights from the saved model
    saved_model = tf.keras.models.load_model('skin_lesion_model.h5', compile=False)
    model.set_weights(saved_model.get_weights())
    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
    print("Model loaded successfully")
    
    le_classes = np.load('label_encoder_classes.npy', allow_pickle=True)
    print("Label encoder loaded successfully")
    le = LabelEncoder()
    le.classes_ = le_classes
except Exception as e:
    print(f"Error loading model or label encoder: {str(e)}")
    print(f"Current working directory: {os.getcwd()}")
    print(f"Files in current directory: {os.listdir('.')}")
    raise e

@app.get("/")
async def root():
    return {"message": "Oncoscopic ML API is running"}

@app.post("/predict")
async def predict_image(file: UploadFile = File(...)):
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
        import traceback
        return {
            'error': str(e),
            'traceback': traceback.format_exc()
        } 