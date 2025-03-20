import React from "react";
import Pizza from "./Pizza";
import data from "../utils/data";

const Menu = () => {
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      {data.map((pizza) => {
        return <Pizza pizza={pizza} />;
      })}
    </main>
  );
};

export default Menu;
