import arrowImg from "../assets/icon-arrow-down.svg";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  return (
    <div className="accordion-item">
      <button
        className={`accordion-question ${isOpen ? "active" : ""}`}
        onClick={onToggle}
      >
        <h2>{question}</h2>
        <img src={arrowImg} alt="arrow" className="arrow-icon" />
      </button>
      {isOpen && <p className="accordion-answer">{answer}</p>}
    </div>
  );
}
