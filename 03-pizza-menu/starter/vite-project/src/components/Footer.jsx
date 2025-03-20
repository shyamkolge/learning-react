import React from "react";

const Footer = () => {
  const hour = new Date().getHours();
  const onpenHour = 12;
  const closeHour = 22;
  const isOpen = hour >= onpenHour && hour <= closeHour;

  return (
    <footer className="footer">
      {isOpen ? (
        <Order closeHour={closeHour} openHour={onpenHour} />
      ) : (
        <p>
          We are happy to welcome you between {onpenHour}:00 and {closeHour}:00
        </p>
      )}
    </footer>
  );
};

export default Footer;

const Order = ({ closeHour, openHour }) => {
  return (
    <div className="order">
      <p>
        We are open till {closeHour}:00 to {openHour}
      </p>
      <button className="btn">Order</button>
    </div>
  );
};
