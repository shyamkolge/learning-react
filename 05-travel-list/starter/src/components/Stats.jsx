const Stats = ({ items }) => {
  if (!items.length)
    return <div className="stats">Add Some Items, To your Packing List.!</div>;

  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;

  const percentage = Math.round((packedItems / totalItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage == 100
          ? "You have everyting to go ..! 🚀"
          : ` You have ${totalItems} itmes in your list, and you already packed 
        ${packedItems} (${percentage}%)`}
      </em>
    </footer>
  );
};

export default Stats;
