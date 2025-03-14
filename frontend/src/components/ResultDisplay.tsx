
import { DetectionResult } from '@/lib/types';
import { useSequentialAnimation } from '@/lib/animation';
import { cn } from '@/lib/utils';
import { CheckCircle, AlertTriangle, Clock, BarChart3 } from 'lucide-react';

interface ResultDisplayProps {
  result: DetectionResult | null;
  isLoading?: boolean;
}

export default function ResultDisplay({ result, isLoading = false }: ResultDisplayProps) {
  // Animation for result elements
  const [titleVisible, statusVisible, imageVisible, detailsVisible] = 
    useSequentialAnimation(4, 200, result ? 100 : 0);

  // If there's no result and not loading, show empty state
  if (!result && !isLoading) {
    return (
      <div className="form-section h-full flex flex-col items-center justify-center text-center p-8">
        <div className="p-4 rounded-full bg-detection-blue/10 mb-4">
          <BarChart3 className="h-8 w-8 text-detection-blue" />
        </div>
        <h3 className="text-xl font-medium">No Results Yet</h3>
        <p className="text-muted-foreground mt-2 max-w-md">
          Enter transaction details and submit to see fraud detection results
        </p>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="form-section h-full flex flex-col items-center justify-center p-8">
        <div className="relative w-20 h-20 mb-6">
          <div className="absolute inset-0 rounded-full border-t-2 border-b-2 border-primary animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-r-2 border-l-2 border-primary/30 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          <div className="absolute inset-4 rounded-full border-t-2 border-b-2 border-primary/60 animate-spin" style={{ animationDuration: '2s' }}></div>
        </div>
        <h3 className="text-xl font-medium animate-pulse">Analyzing Transaction</h3>
        <p className="text-muted-foreground mt-2 max-w-md">
          Processing your data through our machine learning model...
        </p>
      </div>
    );
  }

  return (
    <div className="form-section h-full">
      <div className={cn(
        "opacity-0",
        titleVisible && "animate-slide-down"
      )}>
        <div className="chip bg-detection-blue/10 text-detection-blue">
          Analysis Results
        </div>
        <h2 className="text-2xl font-semibold mt-2">Transaction Fraud Detection</h2>
        <p className="text-muted-foreground mt-1">
          Our machine learning model has analyzed your transaction
        </p>
      </div>
      
      {/* Status indicator */}
      <div className={cn(
        "mt-6 p-4 rounded-lg border flex items-center opacity-0",
        result?.isFraud 
          ? "border-fraud/20 bg-fraud/5" 
          : "border-normal/20 bg-normal/5",
        statusVisible && "animate-scale-in"
      )}>
        <div className={cn(
          "p-2 rounded-full mr-4",
          result?.isFraud ? "bg-fraud/10" : "bg-normal/10"
        )}>
          {result?.isFraud ? (
            <AlertTriangle className="h-6 w-6 text-fraud" />
          ) : (
            <CheckCircle className="h-6 w-6 text-normal" />
          )}
        </div>
        <div>
          <h3 className="font-medium">
            {result?.isFraud ? "Fraudulent Transaction Detected" : "Normal Transaction"}
          </h3>
          <p className={cn(
            "text-sm", 
            result?.isFraud ? "text-fraud/80" : "text-normal/80"
          )}>
            {result?.isFraud 
              ? "Our model has flagged this transaction as potentially fraudulent" 
              : "This transaction appears to be legitimate"
            }
          </p>
        </div>
        {/* {result?.confidence !== undefined && (
          <div className="ml-auto">
            <div className="text-sm font-medium">Confidence</div>
            <div className="text-xl font-bold">
              {Math.round(result.confidence * 100)}%
            </div>
          </div>
        )} */}
      </div>
      
      {/* Visualization image */}
      <div className={cn(
        "mt-6 opacity-0",
        imageVisible && "animate-fade-in"
      )}>
        <h3 className="text-sm font-medium mb-3">Transaction Analysis Visualization</h3>
        <div className="relative rounded-lg overflow-hidden border border-border bg-secondary/30 aspect-[4/3] flex items-center justify-center">
          {result?.imageUrl ? (
            <img 
              src={result.imageUrl} 
              alt="Transaction visualization" 
              className="w-full h-full object-contain"
              loading="lazy"
            />
          ) : (
            <div className="text-muted-foreground">No visualization available</div>
          )}
        </div>
      </div>
      
      {/* Additional details */}
      {/* {result?.processingTime && (
        <div className={cn(
          "mt-6 p-4 rounded-lg border border-border bg-white flex items-center opacity-0",
          detailsVisible && "animate-slide-up"
        )}>
          <Clock className="h-5 w-5 text-muted-foreground mr-3" />
          <span className="text-sm text-muted-foreground">
            Processing time: <span className="font-medium text-foreground">{result.processingTime.toFixed(2)}ms</span>
          </span>
        </div>
      )} */}
    </div>
  );
}
