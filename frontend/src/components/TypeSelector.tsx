
import { useState, useRef, useEffect } from 'react';
import { TransactionType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface TypeSelectorProps {
  value: TransactionType | '';
  onChange: (value: TransactionType) => void;
  disabled?: boolean;
}

export default function TypeSelector({ value, onChange, disabled = false }: TypeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  const options: TransactionType[] = ['CASH_OUT', 'PAYMENT', 'CASH_IN', 'TRANSFER', 'DEBIT'];

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: TransactionType) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          "input-field flex items-center justify-between text-left",
          isOpen && "ring-2 ring-primary/30 border-primary/50",
          disabled && "opacity-70 cursor-not-allowed"
        )}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={cn("block truncate", !value && "text-muted-foreground")}>
          {value || "Select transaction type"}
        </span>
        <ChevronDown className={cn("h-4 w-4 opacity-50 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg border border-border overflow-hidden animate-scale-in">
          <ul 
            className="max-h-60 overflow-auto py-1"
            role="listbox"
          >
            {options.map((option) => (
              <li
                key={option}
                className={cn(
                  "px-4 py-2.5 hover:bg-detection-highlight cursor-pointer transition-colors",
                  option === value && "bg-primary/10 font-medium text-primary"
                )}
                role="option"
                aria-selected={option === value}
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
