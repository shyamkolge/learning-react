import { useState } from "react";
import "./App.css";
import { Form, Logo, PackingList, Stats } from "./components";

function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((Items) => [...Items, item]);
  }

  function handleDeletItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItems(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  const clearList = () => {
    setItems([]);
  };

  const sort = () => {
    console.log("hello");
  };

  return (
    <>
      <Logo />
      <Form handleAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeletItems}
        onToggleItems={handleToggleItems}
        onClear={clearList}
        onSort={sort}
      />
      <Stats items={items} />
    </>
  );
}

export default App;
