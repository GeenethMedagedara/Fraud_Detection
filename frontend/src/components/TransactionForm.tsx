
// import { useState } from 'react';
// import { TransactionInput, TransactionType } from '@/lib/types';
// import TypeSelector from './TypeSelector';
// import { toast } from 'sonner';

// interface TransactionFormProps {
//   onSubmit: (data: TransactionInput) => void;
//   isLoading: boolean;
// }

// // Initial state for the form
// const initialState: TransactionInput = {
//   step: 1,
//   type: 0.0 as number, // Will be set properly when selected
//   amount: 0,
//   oldbalanceOrg: 0,
//   newbalanceOrig: 0,
//   oldbalanceDest: 0,
//   newbalanceDest: 0,
//   isFlaggedFraud: 0
// };

// // Define the mapping for transaction types
// const transactionTypeMapping: Record<string, number> = {
//   "CASH_OUT": 1.0,
//   "TRANSFER": 4.0,
//   "PAYMENT": 3.0,
//   "CASH_IN": 0.0,
//   "DEBIT": 2.0
// };

// // Example function to set type based on selection
// function setTransactionType(selectedType: string) {
//   return transactionTypeMapping[selectedType] ?? 0.0; // Default to CASH_IN (0.0) if not found
// }

// export default function TransactionForm({ onSubmit, isLoading }: TransactionFormProps) {
//   const [formData, setFormData] = useState<TransactionInput & { type: TransactionType | '' }>({
//     ...initialState
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
    
//     // Parse numeric fields
//     if (name === 'step') {
//       const step = parseInt(value);
//       if (isNaN(step) || step < 1 || step > 744) {
//         return;
//       }
//       setFormData({ ...formData, [name]: step });
//     } else if (
//       ['amount', 'oldbalanceOrg', 'newbalanceOrig', 'oldbalanceDest', 'newbalanceDest', 'isFlaggedFraud'].includes(name)
//     ) {
//       const numValue = parseFloat(value);
//       setFormData({ ...formData, [name]: isNaN(numValue) ? 0 : numValue });
//     }
//   };

//   const handleTypeChange = (type: TransactionType) => {
//     setFormData({ ...formData, type });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Validate form
//     if (!formData.type) {
//       toast.error('Please select a transaction type');
//       return;
//     }
    
//     // Submit the form
//     onSubmit(formData as TransactionInput);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="form-section animate-fade-in">
//       <div className="mb-6">
//         <div className="chip bg-detection-blue/10 text-detection-blue">
//           Transaction Details
//         </div>
//         <h2 className="text-2xl font-semibold mt-2">Enter Transaction Information</h2>
//         <p className="text-muted-foreground mt-1">
//           Fill in the transaction details below for fraud detection analysis
//         </p>
//       </div>
      
//       <div className="space-y-6">
//         <div className="form-grid">
//           <div>
//             <label htmlFor="step" className="input-label">
//               Step (1-744)
//             </label>
//             <input
//               id="step"
//               name="step"
//               type="number"
//               min="1"
//               max="744"
//               value={formData.step}
//               onChange={handleChange}
//               disabled={isLoading}
//               className="input-field"
//               placeholder="Enter step (1-744)"
//             />
//             <p className="text-xs text-muted-foreground mt-1">
//               Represents time in hours (1-744 for 30 days simulation)
//             </p>
//           </div>
          
//           <div>
//             <label htmlFor="type" className="input-label">
//               Transaction Type
//             </label>
//             <TypeSelector
//               value={formData.type}
//               onChange={handleTypeChange}
//               disabled={isLoading}
//             />
//           </div>
//         </div>
        
//         <div>
//           <label htmlFor="amount" className="input-label">
//             Transaction Amount
//           </label>
//           <input
//             id="amount"
//             name="amount"
//             type="number"
//             step="0.01"
//             min="0"
//             value={formData.amount}
//             onChange={handleChange}
//             disabled={isLoading}
//             className="input-field"
//             placeholder="Enter transaction amount"
//           />
//         </div>
        
//         <div className="border-t border-border pt-6">
//           <h3 className="text-sm font-medium mb-4">Origin Account Details</h3>
//           <div className="form-grid">
//             <div>
//               <label htmlFor="oldbalanceOrg" className="input-label">
//                 Initial Balance (Origin)
//               </label>
//               <input
//                 id="oldbalanceOrg"
//                 name="oldbalanceOrg"
//                 type="number"
//                 step="0.01"
//                 min="0"
//                 value={formData.oldbalanceOrg}
//                 onChange={handleChange}
//                 disabled={isLoading}
//                 className="input-field"
//                 placeholder="Initial balance before transaction"
//               />
//             </div>
            
//             <div>
//               <label htmlFor="newbalanceOrig" className="input-label">
//                 New Balance (Origin)
//               </label>
//               <input
//                 id="newbalanceOrig"
//                 name="newbalanceOrig"
//                 type="number"
//                 step="0.01"
//                 min="0"
//                 value={formData.newbalanceOrig}
//                 onChange={handleChange}
//                 disabled={isLoading}
//                 className="input-field"
//                 placeholder="New balance after transaction"
//               />
//             </div>
//           </div>
//         </div>
        
//         <div className="border-t border-border pt-6">
//           <h3 className="text-sm font-medium mb-4">Destination Account Details</h3>
//           <div className="form-grid">
//             <div>
//               <label htmlFor="oldbalanceDest" className="input-label">
//                 Initial Balance (Destination)
//               </label>
//               <input
//                 id="oldbalanceDest"
//                 name="oldbalanceDest"
//                 type="number"
//                 step="0.01"
//                 min="0"
//                 value={formData.oldbalanceDest}
//                 onChange={handleChange}
//                 disabled={isLoading}
//                 className="input-field"
//                 placeholder="Initial balance recipient before transaction"
//               />
//             </div>
            
//             <div>
//               <label htmlFor="newbalanceDest" className="input-label">
//                 New Balance (Destination)
//               </label>
//               <input
//                 id="newbalanceDest"
//                 name="newbalanceDest"
//                 type="number"
//                 step="0.01"
//                 min="0"
//                 value={formData.newbalanceDest}
//                 onChange={handleChange}
//                 disabled={isLoading}
//                 className="input-field"
//                 placeholder="New balance recipient after transaction"
//               />
//             </div>
//           </div>
//         </div>
        
//         <div className="pt-2">
//           <button 
//             type="submit" 
//             className="button-primary w-full"
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <span className="flex items-center justify-center">
//                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Processing...
//               </span>
//             ) : (
//               'Analyze Transaction'
//             )}
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// }


import { useState } from 'react';
import { TransactionInput } from '@/lib/types';
import TypeSelector from './TypeSelector';
import { toast } from 'sonner';

interface TransactionFormProps {
  onSubmit: (data: TransactionInput) => void;
  isLoading: boolean;
}

// Define transaction type mappings
const transactionTypeMapping: Record<string, number> = {
  "CASH_OUT": 1.0,
  "TRANSFER": 4.0,
  "PAYMENT": 3.0,
  "CASH_IN": 0.0,
  "DEBIT": 2.0
};

// Initial state
const initialState: TransactionInput = {
  step: 1,
  type: 0.0, // Default is "CASH_IN"
  amount: 0,
  oldbalanceOrg: 0,
  newbalanceOrig: 0,
  oldbalanceDest: 0,
  newbalanceDest: 0,
  isFlaggedFraud: 0
};

export default function TransactionForm({ onSubmit, isLoading }: TransactionFormProps) {
  const [formData, setFormData] = useState<TransactionInput>(initialState);

  // Handles numeric field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'step') {
      // Ensure step is between 1 and 744
      let step = parseInt(value);
      step = isNaN(step) ? 1 : Math.max(1, Math.min(744, step));
      setFormData(prev => ({ ...prev, [name]: step }));
    } else if (['amount', 'oldbalanceOrg', 'newbalanceOrig', 'oldbalanceDest', 'newbalanceDest', 'isFlaggedFraud'].includes(name)) {
      const numValue = parseFloat(value);
      setFormData(prev => ({ ...prev, [name]: isNaN(numValue) ? 0 : numValue }));
    }
  };

  // Handles transaction type selection
  const handleTypeChange = (selectedType: string) => {
    const numericType = transactionTypeMapping[selectedType] ?? 0.0; // Default to "CASH_IN" (0.0)
    setFormData(prev => ({ ...prev, type: numericType }));
  };

  // Handles form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.type === null || formData.type === undefined) {
      toast.error('Please select a transaction type');
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form-section animate-fade-in">
      <div className="mb-6">
        <div className="chip bg-detection-blue/10 text-detection-blue">
          Transaction Details
        </div>
        <h2 className="text-2xl font-semibold mt-2">Enter Transaction Information</h2>
        <p className="text-muted-foreground mt-1">
          Fill in the transaction details below for fraud detection analysis
        </p>
      </div>

      <div className="space-y-6">
        <div className="form-grid">
          <div>
            <label htmlFor="step" className="input-label">
              Step (1-744)
            </label>
            <input
              id="step"
              name="step"
              type="number"
              min="1"
              max="744"
              value={formData.step}
              onChange={handleChange}
              disabled={isLoading}
              className="input-field"
              placeholder="Enter step (1-744)"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Represents time in hours (1-744 for 30 days simulation)
            </p>
          </div>

          <div>
            <label htmlFor="type" className="input-label">
              Transaction Type
            </label>
            <TypeSelector
              value={Object.keys(transactionTypeMapping).find(key => transactionTypeMapping[key] === formData.type) || ''}
              onChange={handleTypeChange}
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <label htmlFor="amount" className="input-label">
            Transaction Amount
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            min="0"
            value={formData.amount}
            onChange={handleChange}
            disabled={isLoading}
            className="input-field"
            placeholder="Enter transaction amount"
          />
        </div>

        {/* Origin Account */}
        <div className="border-t border-border pt-6">
          <h3 className="text-sm font-medium mb-4">Origin Account Details</h3>
          <div className="form-grid">
            <div>
              <label htmlFor="oldbalanceOrg" className="input-label">
                Initial Balance (Origin)
              </label>
              <input
                id="oldbalanceOrg"
                name="oldbalanceOrg"
                type="number"
                step="0.01"
                min="0"
                value={formData.oldbalanceOrg}
                onChange={handleChange}
                disabled={isLoading}
                className="input-field"
                placeholder="Initial balance before transaction"
              />
            </div>

            <div>
              <label htmlFor="newbalanceOrig" className="input-label">
                New Balance (Origin)
              </label>
              <input
                id="newbalanceOrig"
                name="newbalanceOrig"
                type="number"
                step="0.01"
                min="0"
                value={formData.newbalanceOrig}
                onChange={handleChange}
                disabled={isLoading}
                className="input-field"
                placeholder="New balance after transaction"
              />
            </div>
          </div>
        </div>

        {/* Destination Account */}
        <div className="border-t border-border pt-6">
          <h3 className="text-sm font-medium mb-4">Destination Account Details</h3>
          <div className="form-grid">
            <div>
              <label htmlFor="oldbalanceDest" className="input-label">
                Initial Balance (Destination)
              </label>
              <input
                id="oldbalanceDest"
                name="oldbalanceDest"
                type="number"
                step="0.01"
                min="0"
                value={formData.oldbalanceDest}
                onChange={handleChange}
                disabled={isLoading}
                className="input-field"
                placeholder="Initial balance recipient before transaction"
              />
            </div>

            <div>
              <label htmlFor="newbalanceDest" className="input-label">
                New Balance (Destination)
              </label>
              <input
                id="newbalanceDest"
                name="newbalanceDest"
                type="number"
                step="0.01"
                min="0"
                value={formData.newbalanceDest}
                onChange={handleChange}
                disabled={isLoading}
                className="input-field"
                placeholder="New balance recipient after transaction"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button 
            type="submit" 
            className="button-primary w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Analyze Transaction'}
          </button>
        </div>
      </div>
    </form>
  );
}
