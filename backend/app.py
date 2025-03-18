"""
Handles the prediction and SHAP explanation generation.
"""

from flask import Flask, request, jsonify
import numpy as np
from flask_cors import CORS
import shap
import matplotlib.pyplot as plt
import os
import joblib
import io
import base64
import xgboost as xgb
import pandas as pd
from PIL import Image
from html2image import Html2Image

# Load trained model
model = joblib.load("../model/xgboost_model.pkl")

# Initialize Flask app
app = Flask(__name__)

CORS(app, supports_credentials=True, resources={
    r"/*": {
        "origins": [
            "http://host.docker.internal:8080",
            "http://localhost:8080",
            "http://backend:4000"  # If using Docker Compose
        ],
        "allow_headers": ["Content-Type", "Authorization"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    }
})

# Create directory for SHAP images
shap_dir = "static/shap_images"
os.makedirs(shap_dir, exist_ok=True)

# Define feature names (including new engineered features)
feature_names = [
    "step", "type", "amount", "oldbalanceOrg", "newbalanceOrig",
    "oldbalanceDest", "newbalanceDest", "isFlaggedFraud", "transaction_count",
    "balance_change", "amount_balance_ratio"
]

# Store transaction history to calculate transaction velocity
transaction_history = pd.DataFrame(columns=["step"])


@app.route('/predict', methods=['POST'])
def predict():
    try:
        global transaction_history

        # Get JSON data
        data = request.json

        # Convert input data to a DataFrame
        input_df = pd.DataFrame([data])

        # Compute new features dynamically
        # Transaction Velocity (Count of transactions at the same step)
        transaction_history = pd.concat([transaction_history, input_df[["step"]]], ignore_index=True)
        transaction_count = transaction_history[transaction_history["step"] == data["step"]].shape[0]

        # Balance Change Ratio
        balance_change = (data["newbalanceOrig"] - data["oldbalanceOrg"]) / (data["oldbalanceOrg"] + 1e-5)

        # Amount-to-Balance Ratio
        amount_balance_ratio = data["amount"] / (data["oldbalanceOrg"] + 1e-5)

        # Prepare final feature array
        features = np.array([
            data["step"], data["type"], data["amount"], data["oldbalanceOrg"],
            data["newbalanceOrig"], data["oldbalanceDest"], data["newbalanceDest"], 
            data["isFlaggedFraud"], transaction_count, balance_change, amount_balance_ratio
        ]).reshape(1, -1)

        # Predict fraud (1 = Fraud, 0 = Not Fraud)
        prediction = int(model.predict(features)[0])

        # Generate SHAP explanation
        explainer = shap.TreeExplainer(model)
        shap_values = explainer.shap_values(features)
        
        # Generate SHAP Summary Plot (This works perfectly!)
        plt.figure()
        shap.summary_plot(shap_values, features, feature_names=feature_names, show=False)
        plt.savefig("shap_plot.png", bbox_inches="tight", dpi=300)
        plt.close()

        # Convert image to base64
        with open("shap_plot.png", "rb") as img_file:
            img_base64 = base64.b64encode(img_file.read()).decode('utf-8')


        return jsonify({
            "prediction": prediction,
            "image_url": img_base64
        })

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=4000, debug=True)