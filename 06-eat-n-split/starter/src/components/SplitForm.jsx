import React, { useEffect, useState } from "react";

const SplitForm = ({ friend, onSplitBill }) => {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  const handelSubmit = (e) => {
    e.preventDefault();
    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  };

  return (
    <form onSubmit={handelSubmit} className="form-split-bill">
      <h2>Split the bill with {friend.name}</h2>

      <label htmlFor="bill">💰Bill value :</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label htmlFor="rul">🫵Your Expence :</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label htmlFor="rul">🧑‍🤝‍🧑{friend.name}'s Expence :</label>
      <input type="text" value={paidByFriend} disabled />

      <label htmlFor="rul">🤑Who is paying the bill :</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="freind">{friend.name}</option>
      </select>

      <button className="button">Split the bill</button>
    </form>
  );
};

export default SplitForm;
