import { useState } from "react";
import faqData from "../faqData/faqData";
import FaqImages from "./FaqImages";
import AccordionItem from "./AccordionItem";
import "../styles/FaqAccordion.css";

export default function FaqAccordion() {
  const [openedId, setOpenedId] = useState<number | null>(faqData[1].id);

  const clickToggle = (clickedId: number) => {
    if (openedId === clickedId) {
      setOpenedId(null);
    } else {
      setOpenedId(clickedId);
    }
  };

  return (
    <div className="faq-card">
      {/* სურათების სექცია */}
      <FaqImages />

      {/* კონტენტის სექცია */}
      <div className="faq-content">
        <h1 className="faq-title">FAQ</h1>
        {faqData.map((data) => (
          <AccordionItem
            key={data.id}
            question={data.question}
            answer={data.answer}
            isOpen={openedId === data.id}
            onToggle={() => clickToggle(data.id)}
          />
        ))}
      </div>
    </div>
  );
}
