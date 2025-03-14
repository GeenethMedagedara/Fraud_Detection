import joblib
from sklearn.ensemble import IsolationForest
from sklearn.metrics import classification_report
from abc import ABC, abstractmethod

# Step 1: Define the Strategy Interface
class ModelStrategy(ABC):
    @abstractmethod
    def train(self, X_train, y_train=None):  # Unsupervised model doesn't use y_train
        pass

    @abstractmethod
    def predict(self, X_test):
        pass

    @abstractmethod
    def evaluate(self, y_test, y_pred):
        pass

    @abstractmethod
    def save_model(self, file_path):
        pass

# Step 2: Implement Isolation Forest Model Strategy
class IsolationForestModel(ModelStrategy):
    def __init__(self, n_estimators=100, contamination=0.01, random_state=42):
        self.model = IsolationForest(n_estimators=n_estimators, contamination=contamination, random_state=random_state)

    def train(self, X_train, y_train=None):  # Isolation Forest is unsupervised
        self.model.fit(X_train)

    def predict(self, X_test):
        predictions = self.model.predict(X_test)
        return [1 if pred == -1 else 0 for pred in predictions]  # Convert -1 (fraud) to 1

    def evaluate(self, y_test, y_pred):
        return classification_report(y_test, y_pred)

    def save_model(self, file_path="../model/isolation_forest.pkl"):
        joblib.dump(self.model, file_path)
        print(f"Model saved at {file_path}")

# Step 3: Context Class for Model Selection
class ModelContext:
    def __init__(self, strategy: ModelStrategy):
        self.strategy = strategy

    def train_model(self, X_train, y_train=None):
        self.strategy.train(X_train, y_train)

    def make_predictions(self, X_test):
        return self.strategy.predict(X_test)

    def evaluate_model(self, y_test, y_pred):
        self.strategy.save_model()
        return self.strategy.evaluate(y_test, y_pred)
