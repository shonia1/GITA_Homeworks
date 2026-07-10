import React from 'react';

interface ResultDisplayProps {
  tipPerPerson: number;
  totalPerPerson: number;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  tipPerPerson,
  totalPerPerson,
}) => {
  const formatCurrency = (value: number) => {
    return `$${value.toFixed(2)}`;
  };

  return (
    <div className="result-items">
      <div className="result-item">
        <div>
          <div className="result-label">Tip Amount</div>
          <div className="result-per-person">/ person</div>
        </div>
        <div className="result-amount">{formatCurrency(tipPerPerson)}</div>
      </div>
      <div className="result-item">
        <div>
          <div className="result-label">Total</div>
          <div className="result-per-person">/ person</div>
        </div>
        <div className="result-amount">{formatCurrency(totalPerPerson)}</div>
      </div>
    </div>
  );
};

export default ResultDisplay;