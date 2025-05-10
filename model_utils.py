import tensorflow as tf
from tensorflow import keras
from keras.models import Sequential
from keras.layers import Dense, Dropout, Flatten, Conv2D, MaxPooling2D, RandomFlip, RandomRotation
import numpy as np
from PIL import Image
import matplotlib.pyplot as plt
import gc

IMG_SIZE = 256  # Use 256x256 images

# Data augmentation layer
augmentation = Sequential([
    RandomFlip("horizontal_and_vertical"),
    RandomRotation(0.2),
])

def create_improved_cnn():
    model = Sequential([
        augmentation,
        Conv2D(32, (3, 3), activation='relu', input_shape=(IMG_SIZE, IMG_SIZE, 3)),
        MaxPooling2D(pool_size=(2, 2)),
        Conv2D(32, (3, 3), activation='relu'),
        MaxPooling2D(pool_size=(2, 2)),
        Conv2D(32, (3, 3), activation='relu'),
        MaxPooling2D(pool_size=(2, 2)),
        Conv2D(32, (3, 3), activation='relu'),
        MaxPooling2D(pool_size=(2, 2)),
        Conv2D(32, (3, 3), activation='relu'),
        MaxPooling2D(pool_size=(2, 2)),
        Conv2D(32, (3, 3), activation='relu'),
        MaxPooling2D(pool_size=(2, 2)),
        Flatten(),
        Dense(64, activation='relu'),
        Dense(2, activation='softmax')  # 2 classes
    ])
    return model

def normalizer(image, label):
    image = tf.cast(image, tf.float32) / 255.0
    return image, label

# Example usage for training pipeline:
# train = train.map(normalizer)
# val = val.map(normalizer)
# test = test.map(normalizer)

def load_trained_model():
    try:
        # Load the saved model
        model = tf.keras.models.load_model('skin_lesion_model.h5')
        print("Model loaded successfully!")
        return model
    except Exception as e:
        print(f"Error loading model: {str(e)}")
        print("Please train the model first by running: python train.py")
        return None

def predict_image(image_path, model, le):
    if model is None:
        print("No model loaded. Please load or train the model first.")
        return None, None
    try:
        img = Image.open(image_path).resize((28, 28))
        img_array = np.asarray(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        prediction = model.predict(img_array, verbose=0)
        predicted_class = le.classes_[np.argmax(prediction)]
        confidence = np.max(prediction) * 100
        del img
        del img_array
        gc.collect()
        return predicted_class, confidence
    except Exception as e:
        print(f"Error in prediction: {str(e)}")
        return None, None

def process_uploaded_image(image_path, model, le):
    try:
        predicted_class, confidence = predict_image(image_path, model, le)
        if predicted_class is None:
            return
            
        print(f"\nPrediction Results:")
        print(f"Diagnosed as: {predicted_class}")
        
        # Display the image with prediction
        plt.figure(figsize=(8, 6))
        img = Image.open(image_path)
        plt.imshow(img)
        plt.title(f"Prediction: {predicted_class}")
        plt.axis('off')
        plt.show()
        
        # Clear memory
        plt.close('all')
        del img
        gc.collect()
        
    except Exception as e:
        print(f"Error processing image: {str(e)}")
        gc.collect() 