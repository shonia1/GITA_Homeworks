import React, { useState } from "react";
import "./App.css";
import BillInput from "./components/BillInput";
import TipSelector from "./components/TipSelector";
import PeopleInput from "./components/PeopleInput ";
import ResultDisplay from "./components/ResultDisplay ";
import ResetButton from "./components/ResetButton ";

const App: React.FC = () => {
  // მთავარი მდგომარეობა კომპონენტისთვის
  const [bill, setBill] = useState<string>("");
  const [tip, setTip] = useState<number>(0);
  const [customTip, setCustomTip] = useState<string>("");
  const [people, setPeople] = useState<string>("");

  // გამოთვლები მხოლოდ მაშინ, როცა მონაცემები სწორია
  const billNum = parseFloat(bill);
  const peopleNum = parseInt(people, 10);
  const tipPercent = customTip !== "" ? parseFloat(customTip) : tip;

  const isValid = billNum > 0 && peopleNum > 0 && tipPercent >= 0;

  const tipPerPerson = isValid ? (billNum * (tipPercent / 100)) / peopleNum : 0;

  const totalPerPerson = isValid
    ? (billNum + billNum * (tipPercent / 100)) / peopleNum
    : 0;

  // რესეტის  ფუნქცია
  const handleReset = () => {
    setBill("");
    setTip(0);
    setCustomTip("");
    setPeople("");
  };

  return (
    <div className="app">
      {/* ლოგოს განყოფილება */}
      <div className="logo">
        <span>SPLI</span>
        <span>TTER</span>
      </div>

      {/* მთავარი ბარათის განყოფილება */}
      <div className="card">
        {/* შეყვანის ველები */}
        <div className="inputs">
          <BillInput bill={bill} setBill={setBill} />
          <TipSelector
            tip={tip}
            setTip={setTip}
            customTip={customTip}
            setCustomTip={setCustomTip}
          />
          <PeopleInput people={people} setPeople={setPeople} />
        </div>

        {/* შედეგების განყოფილება */}
        <div className="results">
          <ResultDisplay
            tipPerPerson={tipPerPerson}
            totalPerPerson={totalPerPerson}
          />
          <ResetButton onReset={handleReset} />
        </div>
      </div>
    </div>
  );
};

export default App;
