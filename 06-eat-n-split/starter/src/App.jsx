import "./App.css";
import AddFriendForm from "./components/AddFriendForm.jsx";
import FriendList from "./components/FriendList.jsx";
import SplitForm from "./components/SplitForm.jsx";

import { useState } from "react";
import mockData from "./utils/mockData.js";

function App() {
  const [freinds, setFriends] = useState(mockData);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  //Add new Friend
  const handelAddFriend = (friend) => {
    setFriends((freinds) => [...freinds, friend]);
  };

  // Select a friend
  const handelSelection = (friend) => {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  };

  // Split the Bill
  const handelSplitBill = (value) => {
    setFriends((friends) =>
      friends.map((freind) =>
        freind.id === selectedFriend.id
          ? { ...freind, balance: freind.balance + value }
          : freind
      )
    );

    setSelectedFriend(null);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friends={freinds} onSelection={handelSelection} />

        {showAddFriend && <AddFriendForm onAddFriend={handelAddFriend} />}
        <button
          className="button"
          onClick={() =>
            setShowAddFriend((show) => !show, setSelectedFriend(null))
          }
        >
          {showAddFriend ? "Close" : "Add Friend"}
        </button>
      </div>

      {selectedFriend && (
        <SplitForm friend={selectedFriend} onSplitBill={handelSplitBill} />
      )}
    </div>
  );
}

export default App;
