
import { useState } from 'react';
import { TransactionInput, DetectionResult } from '@/lib/types';
import TransactionForm from '@/components/TransactionForm';
import ResultDisplay from '@/components/ResultDisplay';
import { toast } from 'sonner';
import axios from 'axios';

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);

  // Function to handle form submission
  const handleSubmit = async (data: TransactionInput) => {
    setLoading(true);
    
    try {
      console.log(data);
      const res = await axios.post("/predict", 
      //   {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data), // 🔴 No extra "data" wrapper
      // }
      {
        step: Number(data.step),
        type: Number(data.type), // Convert 'type' to number (should match label encoding)
        amount: Number(data.amount),
        oldbalanceOrg: Number(data.oldbalanceOrg),
        newbalanceOrig: Number(data.newbalanceOrig),
        oldbalanceDest: Number(data.oldbalanceDest),
        newbalanceDest: Number(data.newbalanceDest),
        isFlaggedFraud: Number(data.isFlaggedFraud)
      }
    );
      console.log(res.data);
      // In a real app, this would be an API call to your ML service
      // Simulating API call with a timeout
      // await new Promise(resolve => setTimeout(resolve, 1500));
      //   Fraud     Legit
      // // Mock response - in a real app, this would come from your API
      const mockResponse: DetectionResult = {
        isFraud: res.data.prediction === 1, // Set isFraud based on prediction
        imageUrl: `data:image/png;base64,${res.data.image_url}`, // Random image
        // confidence: Math.random() * 0.5 + 0.5, // Random confidence between 50-100%
        // processingTime: Math.random() * 500 + 100 // Random processing time
      };
      
      setResult(mockResponse);
      toast.success('Transaction analyzed successfully');
    } catch (error) {
      console.error('Error analyzing transaction:', error);
      toast.error('Failed to analyze transaction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-white">
        <div className="container py-6">
          <h1 className="text-3xl font-bold animate-fade-in">Transaction Fraud Detection</h1>
          <p className="text-muted-foreground mt-1 animate-fade-in animate-delay-100">
            Analyze transactions using our advanced machine learning model
          </p>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container py-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="md:sticky md:top-8 self-start">
            <TransactionForm 
              onSubmit={handleSubmit}
              isLoading={loading}
            />
          </div>
          
          <div>
            <ResultDisplay 
              result={result}
              isLoading={loading}
            />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border py-6 mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          <p>Fraud Detection Visualization Tool © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
