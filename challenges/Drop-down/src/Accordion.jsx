import React from "react";
import { useState } from "react";
import AccordionItem from "./AccordionItem";

const Accordion = ({ data }) => {
  const [CurOpen, setCurOpen] = useState(null);

  return (
    <div className="accordion">
      {data.map((item, i) => (
        <AccordionItem
          CurOpen={CurOpen}
          onOpen={setCurOpen}
          key={item.num}
          num={i}
          title={item.title}
          text={item.text}
        />
      ))}
    </div>
  );
};

export default Accordion;
