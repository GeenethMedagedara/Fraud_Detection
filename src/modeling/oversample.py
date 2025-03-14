from imblearn.over_sampling import SMOTE
from abc import ABC, abstractmethod

# Step 1: Define the Strategy Interface
class OversamplingStrategy(ABC):
    @abstractmethod
    def apply_oversampling(self, X, y):
        pass

# Step 2: Implement SMOTE Oversampling Strategy
class SMOTEStrategy(OversamplingStrategy):
    def __init__(self, sampling_strategy=0.2, random_state=42):
        self.sampling_strategy = sampling_strategy
        self.random_state = random_state

    def apply_oversampling(self, X, y):
        smote = SMOTE(sampling_strategy=self.sampling_strategy, random_state=self.random_state)
        X_resampled, y_resampled = smote.fit_resample(X, y)
        return X_resampled, y_resampled

# Step 3: Context Class for Applying Oversampling Strategies
class OversamplingContext:
    def __init__(self, strategy: OversamplingStrategy):
        self.strategy = strategy

    def apply(self, X, y):
        return self.strategy.apply_oversampling(X, y)