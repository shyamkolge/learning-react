/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";

const AddFriendForm = ({ onAddFriend }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const handelSubmit = (e) => {
    e.preventDefault();
    if (!name || !image) return;

    const newFriend = {
      id: crypto.randomUUID(),
      name,
      image: `${image}?=${crypto.randomUUID()}`,
      balance: 0,
    };

    setName("");
    setImage("https://i.pravatar.cc/48");
    onAddFriend(newFriend);
  };

  return (
    <form onSubmit={handelSubmit} className="form-add-friend">
      {/* add the name  */}
      <label htmlFor="name">🙎‍♂️Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Add the image */}
      <label htmlFor="rul">📷Image URL:</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <button className="button">Add Friend</button>
    </form>
  );
};

export default AddFriendForm;
