import React from "react";

interface ResetButtonProps {
  onReset: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onReset }) => {
  // ფორმის საწყის მდგომარეობაში დაბრუნება
  return (
    <button className="reset-btn" onClick={onReset}>
      RESET
    </button>
  );
};

export default ResetButton;
