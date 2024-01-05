import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddForm, setShowAddForm] = useState(false);
  const [select, setSelect] = useState(null);

  const halndleShowAddForm = () => {
    setShowAddForm((show) => !show);
    setSelect(null);
  };

  const handleAddFriend = (newfriend) => {
    setFriends((friends) => [...friends, newfriend]);
  };

  const handelSelect = (friend) => {
    setSelect((curr) => (curr?.id === friend.id ? null : friend));
    setShowAddForm(false);
  };

  const handleSplitBill = (value) => {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === select.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelect(null);
  };
  return (
    <>
      <h1>Eat-n-Split</h1>
      <div className="app">
        <div className="sidebar">
          <FriendsList
            friends={friends}
            selectHandeler={handelSelect}
            selectedFriend={select}
          />

          {showAddForm && <FormAddFriend onAdd={handleAddFriend} />}
          <button className="button" onClick={halndleShowAddForm}>
            {showAddForm ? "Close" : "Add friend"}
          </button>
        </div>

        {select && (
          <FormSplitBill
            selectedFriend={select}
            onSplitBill={handleSplitBill}
          />
        )}
      </div>
    </>
  );
}
export default App;

// ----------Components---------

function FriendsList({ friends, selectHandeler, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          selectHandeler={selectHandeler}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, selectHandeler, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even.</p>}
      <button className="button" onClick={() => selectHandeler(friend)}>
        {isSelected ? "Close" : "Select"}
      </button>
    </li>
  );
}
function FormAddFriend({ onAdd }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = crypto.randomUUID();
    const newfriend = {
      name,
      id,
      image: `${image}?=${id}`,
      balance: 0,
    };
    onAdd(newfriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  };
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👯Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🎇Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button className="button">Add</button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [userExpences, setUseExpences] = useState("");
  const friendExpences = Number(bill) - Number(userExpences);
  const [paying, setPaying] = useState("user");

  return (
    <form
      className="form-split-bill"
      onSubmit={(e) => {
        e.preventDefault();
        if (!bill || !userExpences) return;
        onSplitBill(paying === "user" ? friendExpences : -userExpences);
      }}
    >
      <h2>Split the bill with {selectedFriend.name}</h2>
      <label>💰Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🫰Your expences</label>
      <input
        type="text"
        value={userExpences}
        onChange={(e) =>
          setUseExpences(
            Number(e.target.value) > bill
              ? userExpences
              : Number(e.target.value)
          )
        }
      />

      <label>💵{selectedFriend.name}'s expences</label>
      <input type="text" disabled value={bill ? friendExpences : ""} />

      <label>🤑 Who is paying?</label>
      <select value={paying} onChange={(e) => setPaying(e.target.value)}>
        <option value="user">you</option>
        <option value={selectedFriend.name}>{selectedFriend.name}</option>
      </select>
      <button className="button">Split bill</button>
    </form>
  );
}
