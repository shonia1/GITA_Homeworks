import React from "react";

interface TipSelectorProps {
  tip: number;
  setTip: (value: number) => void;
  customTip: string;
  setCustomTip: (value: string) => void;
}

const TipSelector: React.FC<TipSelectorProps> = ({
  tip,
  setTip,
  customTip,
  setCustomTip,
}) => {
  // წინასწარ შერჩეული ფულის წილის ვარიანტები
  const tipOptions = [5, 10, 15, 25, 50];

  // პრეებსეტირებული პროცენტის არჩევა
  const handleTipClick = (value: number) => {
    setTip(value);
    setCustomTip("");
  };

  // მომხმარებლის მიერ დაწერილი პროცენტის შეყვანა
  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setCustomTip(value);
      if (value !== "") {
        setTip(0);
      }
    }
  };

  return (
    <div className="input-group tip-selector">
      {/* წილის არჩევის განყოფილება */}
      <label>Select Tip %</label>
      <div className="tip-grid">
        {tipOptions.map((value) => (
          <button
            key={value}
            className={`tip-btn ${tip === value && customTip === "" ? "active" : ""}`}
            onClick={() => handleTipClick(value)}
          >
            {value}%
          </button>
        ))}
        <div className="custom-tip-wrapper">
          <input
            type="number"
            min="0"
            step="0.1"
            placeholder="Custom"
            value={customTip}
            onChange={handleCustomChange}
            className={`custom-input ${customTip !== "" ? "active" : ""}`}
          />
        </div>
      </div>
    </div>
  );
};

export default TipSelector;
