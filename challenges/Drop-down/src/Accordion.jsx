import React from "react";
import AccordionItem from "./AccordionItem";

const Accordion = ({ data }) => {
  return (
    <div className="accordion">
      {data.map((item, i) => (
        <AccordionItem
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
