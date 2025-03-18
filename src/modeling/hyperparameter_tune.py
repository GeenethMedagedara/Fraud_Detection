"""
Handles the prediction and SHAP explanation generation.
"""

from sklearn.model_selection import GridSearchCV
from xgboost import XGBClassifier
from abc import ABC, abstractmethod

# Step 1: Define the Strategy Interface
class HyperparameterTuningStrategy(ABC):
    @abstractmethod
    def tune_hyperparameters(self, X_train, y_train):
        pass

# Step 2: Implement XGBoost Hyperparameter Tuning Strategy
class XGBoostHyperparameterTuning(HyperparameterTuningStrategy):
    def __init__(self):
        self.param_grid = {
            "max_depth": [3, 5, 7],
            "learning_rate": [0.01, 0.1, 0.3],
            "n_estimators": [100, 200, 300]
        }
        self.best_params = None

    def tune_hyperparameters(self, X_train, y_train):
        grid = GridSearchCV(XGBClassifier(eval_metric="logloss"), self.param_grid, cv=3, scoring="f1")
        grid.fit(X_train, y_train)
        self.best_params = grid.best_params_
        return self.best_params

# Step 3: Context Class for Hyperparameter Tuning
class HyperparameterTuningContext:
    def __init__(self, strategy: HyperparameterTuningStrategy):
        self.strategy = strategy

    def perform_tuning(self, X_train, y_train):
        return self.strategy.tune_hyperparameters(X_train, y_train)
