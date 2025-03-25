import React from "react";
import { useState } from "react";

const AccordionItem = ({ num, title, text }) => {
  const [isOpen, setisOpen] = useState(false);

  const handleToggle = () => {
    setisOpen(!isOpen);
  };

  return (
    <div className={`item ${isOpen && "open"}`} key={num}>
      <p className="number">{num < 9 ? `0${num + 1}` : `${num + 1}`}</p>
      <p className="title">{title}</p>
      <p className="icon" onClick={handleToggle}>
        {isOpen ? "-" : "+"}
      </p>
      {isOpen && <div className="content-box">{text}</div>}
    </div>
  );
};

export default AccordionItem;
