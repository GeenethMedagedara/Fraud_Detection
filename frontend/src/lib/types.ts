
export type TransactionType = 'CASH_OUT' | 'PAYMENT' | 'CASH_IN' | 'TRANSFER' | 'DEBIT';

export interface TransactionInput {
  step: number;
  type: TransactionType;
  amount: number;
  oldbalanceOrg: number;
  newbalanceOrig: number;
  oldbalanceDest: number;
  newbalanceDest: number;
}

export interface DetectionResult {
  isFraud: boolean;
  imageUrl: string;
  confidence?: number;
  processingTime?: number;
}
