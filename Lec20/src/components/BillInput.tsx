import React from "react";

interface BillInputProps {
  bill: string;
  setBill: (value: string) => void;
}

const BillInput: React.FC<BillInputProps> = ({ bill, setBill }) => {
  // შეყვანილი მნიშვნელობის წაკითხვა და მხოლოდ რიცხვითი მნიშვნელობის დაშვება
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setBill(value);
    }
  };

  return (
    <div className="input-group">
      {/* ბილის შეყვანის ველი */}
      <label htmlFor="bill">Bill</label>
      <div className="input-icon-wrapper">
        <span className="icon">$</span>
        <input
          id="bill"
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          value={bill}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default BillInput;
