const Pizza = ({ pizza }) => {
  return (
    <div className="pizza">
      <img src={pizza.photoName} alt="" />
      <div>
        <h3>{pizza.name}</h3>
        <p>{pizza.ingredients}</p>
        <span>{pizza.price + 100}</span>
      </div>
    </div>
  );
};

export default Pizza;
