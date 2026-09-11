from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import numpy as np
import io
from keras.applications.mobilenet_v2 import preprocess_input
from model import load_model

app = Flask(__name__)
CORS(app)

# Load model at module level
model = load_model()
model.load_weights("id_classifier_weights.weights.h5")

def preprocess_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB").resize((224, 224))
    img_array = np.expand_dims(np.array(img), axis=0)
    return preprocess_input(img_array)

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": " ID Classifier API is live!"})

@app.route("/classify", methods=["POST"])
def classify_image():
    file = request.files.get("file")
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    img_bytes = file.read()
    img = preprocess_image(img_bytes)
    prediction = model.predict(img)[0][0]

    result = "ID" if prediction < 0.5 else "Not ID"
    return jsonify({
        "prediction": result,
        "confidence": float(prediction)
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)