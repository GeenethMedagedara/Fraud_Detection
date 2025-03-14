import shap
import numpy as np
import matplotlib.pyplot as plt
from abc import ABC, abstractmethod
from sklearn.inspection import permutation_importance

# Step 1: Define the Strategy Interface
class ExplainabilityStrategy(ABC):
    @abstractmethod
    def explain(self, model, X_test, y_test):
        pass

# Step 2: Implement SHAP Explanation Strategy for Tree-Based Models (XGBoost)
class SHAPExplainability(ExplainabilityStrategy):
    def explain(self, model, X_test, y_test):
        print("Generating SHAP explanations...")
        explainer = shap.TreeExplainer(model)
        shap_values = explainer.shap_values(X_test)
        shap.summary_plot(shap_values, X_test)

# Step 3: Implement Feature Importance Strategy for Isolation Forest
class IsolationForestFeatureImportance(ExplainabilityStrategy):
    def explain(self, model, X_test, y_test):
        print("Computing Feature Importance for Isolation Forest...")
        feature_importance = np.mean([tree.feature_importances_ for tree in model.estimators_], axis=0)
        
        plt.figure(figsize=(10, 5))
        plt.barh(X_test.columns, feature_importance)
        plt.xlabel("Importance")
        plt.ylabel("Feature")
        plt.title("Feature Importance - Isolation Forest")
        plt.show()

# Step 4: Implement Permutation Importance Strategy
class PermutationFeatureImportance(ExplainabilityStrategy):
    def explain(self, model, X_test, y_test):
        print("Computing Permutation Feature Importance...")
        perm_importance = permutation_importance(model, X_test, y_test, scoring='accuracy')
        sorted_idx = perm_importance.importances_mean.argsort()

        plt.figure(figsize=(10, 5))
        plt.barh(X_test.columns[sorted_idx], perm_importance.importances_mean[sorted_idx])
        plt.xlabel("Permutation Importance")
        plt.title("Feature Importance - Permutation Method")
        plt.show()

# Step 5: Implement Feature Importance for Random Forest
class RandomForestFeatureImportance(ExplainabilityStrategy):
    def explain(self, model, X_test, y_test):
        print("Computing Feature Importance for Random Forest...")
        importances = model.feature_importances_
        feature_names = X_test.columns
        indices = np.argsort(importances)[::-1]

        plt.figure(figsize=(10, 6))
        plt.title("Feature Importance - Random Forest")
        plt.bar(range(X_test.shape[1]), importances[indices], align="center")
        plt.xticks(range(X_test.shape[1]), feature_names[indices], rotation=90)
        plt.tight_layout()
        plt.show()

# Step 6: Context Class for Explainability
class ExplainabilityContext:
    def __init__(self, strategy: ExplainabilityStrategy):
        self.strategy = strategy

    def explain_model(self, model, X_test, y_test):
        self.strategy.explain(model, X_test, y_test)
