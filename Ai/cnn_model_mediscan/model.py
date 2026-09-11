import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D
from tensorflow.keras.models import Model

def load_model():
    """Load MobileNetV2-based binary classification model."""
    base_model = MobileNetV2(
        weights='imagenet',
        include_top=False,
        input_shape=(224, 224, 3)
    )

    # Add custom layers
    x = GlobalAveragePooling2D()(base_model.output)
    x = Dense(128, activation='relu')(x)
    output = Dense(1, activation='sigmoid')(x)

    # Combine base and custom layers
    model = Model(inputs=base_model.input, outputs=output)

    # Freeze pretrained layers
    base_model.trainable = False

    return model
