"""
Handles the prediction and SHAP explanation generation.
"""

from sklearn.metrics import precision_score, recall_score, f1_score, confusion_matrix, ConfusionMatrixDisplay
import matplotlib.pyplot as plt
from abc import ABC, abstractmethod

# Step 1: Define the Strategy Interface
class EvaluationStrategy(ABC):
    @abstractmethod
    def evaluate(self, model, X_test, y_test):
        pass

# Step 2: Implement Standard Model Evaluation Strategy
class StandardEvaluation(EvaluationStrategy):
    def evaluate(self, model, X_test, y_test):
        y_pred = model.predict(X_test)
        self._print_metrics(y_test, y_pred)
        self._plot_confusion_matrix(y_test, y_pred)

    def _print_metrics(self, y_test, y_pred):
        print(f"Precision: {precision_score(y_test, y_pred):.4f}")
        print(f"Recall: {recall_score(y_test, y_pred):.4f}")
        print(f"F1 Score: {f1_score(y_test, y_pred):.4f}")

    def _plot_confusion_matrix(self, y_test, y_pred):
        cm = confusion_matrix(y_test, y_pred)
        disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=["Normal", "Fraud"])
        disp.plot()
        plt.title("Confusion Matrix")
        plt.show()

# Step 3: Implement Anomaly Detection Evaluation Strategy (e.g., for Isolation Forest)
class AnomalyDetectionEvaluation(EvaluationStrategy):
    def evaluate(self, model, X_test, y_test):
        y_pred = model.predict(X_test)
        y_pred = [1 if pred == -1 else 0 for pred in y_pred]  # Convert -1 (fraud) to 1, 1 (normal) to 0
        self._print_metrics(y_test, y_pred)
        self._plot_confusion_matrix(y_test, y_pred)

    def _print_metrics(self, y_test, y_pred):
        print(f"Precision: {precision_score(y_test, y_pred):.4f}")
        print(f"Recall: {recall_score(y_test, y_pred):.4f}")
        print(f"F1 Score: {f1_score(y_test, y_pred):.4f}")

    def _plot_confusion_matrix(self, y_test, y_pred):
        cm = confusion_matrix(y_test, y_pred)
        disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=["Normal", "Fraud"])
        disp.plot()
        plt.title("Confusion Matrix")
        plt.show()

# Step 4: Context Class for Model Evaluation
class ModelEvaluationContext:
    def __init__(self, strategy: EvaluationStrategy):
        self.strategy = strategy

    def evaluate_model(self, model, X_test, y_test):
        self.strategy.evaluate(model, X_test, y_test)
