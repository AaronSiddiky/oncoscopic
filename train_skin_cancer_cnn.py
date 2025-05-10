import os
import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from sklearn.model_selection import train_test_split
from keras.models import Sequential
from keras.layers import Conv2D, MaxPool2D, Flatten, Dense, Dropout, BatchNormalization
from keras.callbacks import ModelCheckpoint
import warnings
warnings.filterwarnings('ignore')

# --- CONFIG ---
IMG_SIZE = 28
BATCH_SIZE = 128
EPOCHS = 50
DATA_DIRS = ["data/HAM10000_images_part_1", "data/HAM10000_images_part_2"]
CSV_PATH = "data/HAM10000_metadata.csv"
MODEL_PATH = "skin_lesion_model.h5"

# --- CLASS MAPPING ---
class_map = {
    "bkl": 0,  # Benign keratosis-like lesions
    "bcc": 1,  # Basal cell carcinoma
    "akiec": 2,  # Actinic keratoses
    "vasc": 3,  # Vascular lesions
    "nv": 4,    # Melanocytic nevi
    "mel": 5,   # Melanoma
    "df": 6     # Dermatofibroma
}
NUM_CLASSES = len(class_map)

# --- LOAD METADATA ---
print("Loading metadata...")
df = pd.read_csv(CSV_PATH)
print(f"Total images in metadata: {len(df)}")
print(f"Unique image IDs: {df.image_id.nunique()}")

df = df[df['dx'].isin(class_map.keys())]
print(f"Images after filtering classes: {len(df)}")
df['label'] = df['dx'].map(class_map)

def find_image_path(image_id):
    for d in DATA_DIRS:
        path = os.path.join(d, image_id + ".jpg")
        if os.path.exists(path):
            return path
    return None

print("Finding image paths...")
df['image_path'] = df['image_id'].apply(find_image_path)
missing_images = df[df['image_path'].isna()]
print(f"Images with missing paths: {len(missing_images)}")
if len(missing_images) > 0:
    print("Sample of missing image IDs:", missing_images['image_id'].head().tolist())
df = df.dropna(subset=['image_path'])

# Print class distribution
print("\nClass distribution:")
print(df['dx'].value_counts())

# Shuffle and split data
print("\nSplitting data...")
df = df.sample(frac=1, random_state=42)  # Shuffle all data
train_size = int(0.8 * len(df))
train_df = df[:train_size]
test_df = df[train_size:]

print(f"\nTraining set size: {len(train_df)}")
print(f"Test set size: {len(test_df)}")

def load_and_preprocess_image(path):
    img = load_img(path, target_size=(IMG_SIZE, IMG_SIZE))
    img = img_to_array(img) / 255.0
    return img

print("\nLoading and preprocessing images...")
# Load all images into memory
X_train = np.array([load_and_preprocess_image(path) for path in train_df['image_path']])
y_train = train_df['label'].values
X_test = np.array([load_and_preprocess_image(path) for path in test_df['image_path']])
y_test = test_df['label'].values

print(f"Training set shape: {X_train.shape}")
print(f"Test set shape: {X_test.shape}")

# --- MODEL ---
model = Sequential()

model.add(Conv2D(16, 
                 kernel_size=(3,3), 
                 input_shape=(IMG_SIZE, IMG_SIZE, 3), 
                 activation='relu', 
                 padding='same'))

model.add(MaxPool2D(pool_size=(2,2)))
model.add(tf.keras.layers.BatchNormalization())

model.add(Conv2D(32, 
                 kernel_size=(3,3), 
                 activation='relu'))

model.add(Conv2D(64, 
                 kernel_size=(3,3), 
                 activation='relu'))

model.add(MaxPool2D(pool_size=(2,2)))
model.add(tf.keras.layers.BatchNormalization())

model.add(Conv2D(128, 
                 kernel_size=(3,3), 
                 activation='relu'))

model.add(Conv2D(256, 
                 kernel_size=(3,3), 
                 activation='relu'))

model.add(Flatten())
model.add(tf.keras.layers.Dropout(0.2))
model.add(Dense(256, activation='relu'))
model.add(tf.keras.layers.BatchNormalization())
model.add(tf.keras.layers.Dropout(0.2))
model.add(Dense(128, activation='relu'))
model.add(tf.keras.layers.BatchNormalization())
model.add(Dense(64, activation='relu'))
model.add(tf.keras.layers.BatchNormalization())
model.add(tf.keras.layers.Dropout(0.2))
model.add(Dense(32, activation='relu'))
model.add(tf.keras.layers.BatchNormalization())
model.add(Dense(7, activation='softmax'))

model.summary()

# Callbacks
callback = ModelCheckpoint(
    filepath='best_model.h5',
    monitor='val_accuracy',
    mode='max',
    verbose=1,
    save_best_only=True
)

# Compile model
optimizer = tf.keras.optimizers.Adam(learning_rate=0.001)
model.compile(
    loss='sparse_categorical_crossentropy',
    optimizer=optimizer,
    metrics=['accuracy']
)

# Train model
print("\nStarting training...")
history = model.fit(
    X_train,
    y_train,
    validation_split=0.2,
    batch_size=BATCH_SIZE,
    epochs=EPOCHS,
    shuffle=True,
    callbacks=[callback]
)

# Evaluate on test set
test_loss, test_acc = model.evaluate(X_test, y_test)
print(f"Test accuracy: {test_acc:.4f}")

# Save final model
model.save(MODEL_PATH)
print(f"Model saved to {MODEL_PATH}") 