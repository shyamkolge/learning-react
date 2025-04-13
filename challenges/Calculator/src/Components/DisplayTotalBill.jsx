import React from "react";

const DisplayTotalBill = ({ tip, bill }) => {
  return (
    <h1>
      You pay bill {bill + tip} ({tip} tip + {bill} bill)
    </h1>
  );
};

export default DisplayTotalBill;
