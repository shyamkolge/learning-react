import FriendCard from "./FriendCard.jsx";

const FriendList = ({ friends, onSelection }) => {
  return (
    <ul>
      {friends.map((friend) => {
        return (
          <FriendCard
            key={friend.id}
            friend={friend}
            onSelection={onSelection}
          />
        );
      })}
    </ul>
  );
};

export default FriendList;
