# Fraud Detection in Financial Transactions

img

---

## Overview

This project is an AI-powered fraud detection system that identifies fraudulent transactions using Machine Learning & Anomaly Detection techniques. It incorporates Random Forest, XGBoost, and Isolation Forest, alongside SMOTE for handling imbalanced data.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#setup--installation)
- [How This Works](#how-this-works)
- [Why Built](#why-this-is-built)
- [Screenshots]()

### Features:

- Multi-model fraud detection (Random Forest, XGBoost, Isolation Forest)
- Real-time API built with Flask
- Feature Engineering & Explainability using SHAP & Permutation Importance
- Advanced Evaluation Metrics & Confusion Matrix Visualization

## Tech Stack

- **Machine Learning:** XGBoost, Random Forest, Isolation Forest, GridSearchCV
- **Data Processing:** Pandas, NumPy, SMOTE (imbalanced-learn)
- **Model Evaluation:** SHAP, Permutation Importance, Classification Reports
- **Backend:** Flask (REST API for real-time predictions)
- **Frontend** React

## Installation

1. Clone Repo

```
git clone https://github.com/GeenethMedagedara/Predictive_Maintenance_System.git
cd predictive-maintenance
```

2. Install Dependencies

```
pip install -r requirements.txt

# Go to frontend directory
cd frontend
npm install
```

3. Train the model

Run the two notebooks eda_and_preprocessing.ipynb and modeling_and_evaluation.ipynb respectively 

img

4. Run the App
```
# To run react app
cd frontend 
npm run dev

# To run flask backend
cd backend
flask run --host=0.0.0.0 --port=4000
```

5. Access the frontend at
```
http://localhost:8080
```

## How This Works

Credit card fraud is a rare but high-impact problem where fraudulent transactions make up less than 1% of all transactions. Traditional methods struggle due to the imbalance between fraud and normal transactions. This project builds a fraud detection system by using ML techniques to feature engineers new values, handle the imbalances, and train models to predict the possibility of transactions being fraudulent.

> SMOTE (Synthetic Minority Oversampling Technique) is used to create new synthetic samples by interpolating between existing minority class samples which in result tackles the imbalance problem.

> Feature Engineering(creating new meaning features) is done to improve the model's ability to detect fraud patterns.

> Hyperparameter tuning is the process of finding the best combination of model parameters to improve performance. GridSearchCV tests all possible combinations from a predefined grid of hyperparameter values.

> XGBoost (Extreme Gradient Boosting) is a powerful, optimized gradient boosting algorithm used for classification and regression that builds multiple decision trees sequentially, where each new tree corrects the errors of the previous ones.

> Random Forest is an ensemble of decision trees, where each tree is trained on a random subset of data and features, which makes predictions by averaging the outputs of all trees (for regression) or using a majority vote (for classification).

> Isolation Forest is an unsupervised anomaly detection algorithm designed to detect outliers which works by randomly splitting features and isolating anomalies faster than normal data points.

First, simple EDA is done on the dataset, and then the dataset is scaled, and the feature-engineered values are added. Later the dataset is split into training and testing sets, and SMOTE oversampling is done, and all the models are trained, and later hyperparameter tuning is done to get the most appropriate hyperparameters for the algorithm and we can compare the evaluation metrics along with how the models work with the explainability techniques.

In the frontend, the user can enter the values of a transaction, and whether the transaction is fraud or real will be sent with an explainability visualization.

## Why This is Built

I built this project to learn about how to work with problems regarding fraud detection and how to tackle the class imbalance problem, creating new features to increase model performance and utilize different models to predict a fraud from a legit while tuning a model to use the optimum performance.

## Screenshots