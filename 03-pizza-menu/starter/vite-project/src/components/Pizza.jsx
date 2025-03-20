const Pizza = ({ pizza }) => {
  // if (pizza.soldOut) return null;

  return (
    <div
      className={`pizza ${pizza.soldOut ? "sold-out" : ""}`}
      key={pizza.name}
    >
      <img src={pizza.photoName} alt="" />
      <div>
        <h3>{pizza.name}</h3>
        <p>{pizza.ingredients}</p>

        {/* {pizza.soldOut ? (
          <span>SOLD OUT</span>
        ) : (
          <span>{pizza.price + 100}</span>
        )} */}

        <span>{pizza.soldOut ? "SOLD OUT" : pizza.price + 100}</span>
      </div>
    </div>
  );
};

export default Pizza;
