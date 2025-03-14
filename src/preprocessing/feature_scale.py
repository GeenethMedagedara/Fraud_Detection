from sklearn.preprocessing import LabelEncoder
from abc import ABC, abstractmethod

# Step 1: Define the Strategy Interface
class EncodingStrategy(ABC):
    @abstractmethod
    def encode(self, df, column):
        pass

# Step 2: Implement Label Encoding Strategy
class LabelEncodingStrategy(EncodingStrategy):
    def __init__(self):
        self.encoder = LabelEncoder()

    def encode(self, df, column):
        df[column] = self.encoder.fit_transform(df[column])
        return df

# Step 3: Context Class for Using Different Encoding Strategies
class EncodingContext:
    def __init__(self, strategy: EncodingStrategy):
        self.strategy = strategy

    def apply_encoding(self, df, column):
        return self.strategy.encode(df, column)
