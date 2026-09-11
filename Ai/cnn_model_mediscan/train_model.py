import os
import matplotlib.pyplot as plt
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint
from model import load_model

# Configuration
IMG_SIZE = (224, 224)
BATCH_SIZE = 32
DATA_DIR = "./data"

# Data augmentation (training) and normalization (validation)
train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=15,
    width_shift_range=0.1,
    height_shift_range=0.1,
    brightness_range=[0.8, 1.2],
    zoom_range=0.1,
    horizontal_flip=True,
    fill_mode='nearest'
)

val_datagen = ImageDataGenerator(rescale=1./255)

# Load datasets
train_generator = train_datagen.flow_from_directory(
    os.path.join(DATA_DIR, "train"),
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='binary'
)

val_generator = val_datagen.flow_from_directory(
    os.path.join(DATA_DIR, "val"),
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='binary'
)

print(f"Training samples: {train_generator.samples}")
print(f"Validation samples: {val_generator.samples}")
print(f"Class indices: {train_generator.class_indices}")

# Load and compile model
model = load_model()
model.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['accuracy']
)

# Callbacks
callbacks = [
    EarlyStopping(
        monitor='val_loss',
        patience=5,
        restore_best_weights=True,
        verbose=1
    ),
    ModelCheckpoint(
        "best_id_classifier.weights.h5",
        monitor='val_accuracy',
        save_best_only=True,
        save_weights_only=True,
        verbose=1
    )
]

# Determine epochs dynamically
total_samples = train_generator.samples
epochs = 10 if total_samples < 100 else 20 if total_samples < 500 else 30
print(f"\nDataset size detected → Training for {epochs} epochs\n")

# Train the model
history = model.fit(
    train_generator,
    validation_data=val_generator,
    epochs=epochs,
    callbacks=callbacks
)

# Save final weights
model.save_weights("id_classifier_weights.weights.h5")
print("\n Training complete — weights saved as 'id_classifier_weights.weights.h5'")

# Plot training history
def plot_training_history(history):
    """Plot accuracy and loss curves."""
    plt.figure(figsize=(12, 4))

    # Accuracy
    plt.subplot(1, 2, 1)
    plt.plot(history.history['accuracy'], label='Train')
    plt.plot(history.history['val_accuracy'], label='Val')
    plt.title('Accuracy')
    plt.xlabel('Epoch')
    plt.ylabel('Accuracy')
    plt.legend()
    plt.grid(True)

    # Loss
    plt.subplot(1, 2, 2)
    plt.plot(history.history['loss'], label='Train')
    plt.plot(history.history['val_loss'], label='Val')
    plt.title('Loss')
    plt.xlabel('Epoch')
    plt.ylabel('Loss')
    plt.legend()
    plt.grid(True)

    plt.tight_layout()
    plt.savefig('training_history.png')
    plt.show()

plot_training_history(history)

# Print summary
train_acc = history.history['accuracy'][-1]
val_acc = history.history['val_accuracy'][-1]
train_loss = history.history['loss'][-1]
val_loss = history.history['val_loss'][-1]

print(f"\n=== TRAINING SUMMARY ===")
print(f"Final Train Acc: {train_acc:.4f} | Val Acc: {val_acc:.4f}")
print(f"Final Train Loss: {train_loss:.4f} | Val Loss: {val_loss:.4f}")

# Overfitting check
if train_acc - val_acc > 0.1:
    print("\n Possible overfitting detected. Consider:")
    print(" - Adding more data")
    print(" - Increasing dropout / augmentation")
elif val_acc > 0.95 and train_generator.samples < 200:
    print("\n High accuracy with small dataset — might be overfitting.")
else:
    print("\n Model trained successfully and appears well-generalized.")
