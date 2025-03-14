import pandas as pd
from abc import ABC, abstractmethod

# Step 1: Define the Strategy Interface
class FeatureEngineeringStrategy(ABC):
    @abstractmethod
    def apply_feature(self, df):
        pass

# Step 2: Implement Feature Engineering Strategies

## Transaction Velocity Strategy
class TransactionVelocityStrategy(FeatureEngineeringStrategy):
    def apply_feature(self, df):
        df["transaction_count"] = df.groupby("step")["step"].transform("count")
        return df

## Balance Change Ratio Strategy
class BalanceChangeStrategy(FeatureEngineeringStrategy):
    def apply_feature(self, df):
        df["balance_change"] = (df["newbalanceOrig"] - df["oldbalanceOrg"]) / (df["oldbalanceOrg"] + 1e-5)
        return df

## Amount-to-Balance Ratio Strategy
class AmountBalanceRatioStrategy(FeatureEngineeringStrategy):
    def apply_feature(self, df):
        df["amount_balance_ratio"] = df["amount"] / (df["oldbalanceOrg"] + 1e-5)
        return df

# Step 3: Context Class for Applying Feature Engineering Strategies
class FeatureEngineeringContext:
    def __init__(self, strategy: FeatureEngineeringStrategy):
        self.strategy = strategy

    def apply(self, df):
        return self.strategy.apply_feature(df)
