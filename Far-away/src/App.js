import { useState } from "react";
import "./index.css";
import Logo from "./components/Logo";
import Form from "./components/Form";
import List from "./components/List";
import Counter from "./components/Counter";
// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
// ];
export default function App() {
  const [items, setItems] = useState([]);
  const handleAddItems = (item) => {
    setItems((items) => [...items, item]);
  };
  const handleDelete = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };
  const handleToggleItem = (id) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };
  const handleClearAll = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete everything in the list?"
    );
    if (confirm) {
      setItems([]);
    }
  };
  return (
    <div className="app">
      <Logo />
      <Form AddItem={handleAddItems} />
      <List
        items={items}
        deleteItem={handleDelete}
        toggleItem={handleToggleItem}
        clearAll={handleClearAll}
      />
      <Counter items={items} />
    </div>
  );
}

// function Logo() {
//   return <h1>🌴 Far Away 💼</h1>;
// }

// function Form({ AddItem }) {
//   const [description, setDescription] = useState("");
//   const [quantity, setQuantity] = useState(1);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!description) return;

//     const newItem = { description, quantity, packed: false, id: Date.now() };
//     console.log(newItem);
//     AddItem(newItem);
//     setQuantity(1);
//     setDescription("");
//   };
//   return (
//     <form action="" className="add-form" onSubmit={handleSubmit}>
//       <h3>What do you need 😍 for your trip?</h3>
//       <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
//         {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
//           <option value={num} key={num}>
//             {num}
//           </option>
//         ))}
//       </select>
//       <input
//         type="text"
//         placeholder="Item..."
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />
//       <button>Add</button>
//     </form>
//   );
// }
// function List(props) {
//   const [sortBy, setSortBy] = useState("input");
//   let sortedItems;
//   if (sortBy === "input") {
//     sortedItems = props.items;
//   }
//   if (sortBy === "description") {
//     sortedItems = props.items
//       .slice()
//       .sort((a, b) => a.description.localeCompare(b.description));
//   }
//   if (sortBy === "packed") {
//     sortedItems = props.items
//       .slice()
//       .sort((a, b) => Number(a.packed) - Number(b.packed));
//   }
//   return (
//     <div className="list">
//       <ul>
//         {sortedItems.map((item) => (
//           <Item
//             item={item}
//             key={item.id}
//             deleteItem={props.deleteItem}
//             toggleItem={props.toggleItem}
//           />
//         ))}
//       </ul>
//       <div className="actions">
//         <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//           <option value="input">Sort by input</option>
//           <option value="description">Sort by description</option>
//           <option value="packed">sort by packed status</option>
//         </select>
//         <button onClick={props.clearAll}>Clear List</button>
//       </div>
//     </div>
//   );
// }

// function Item({ item, deleteItem, toggleItem }) {
//   return (
//     <li>
//       <input
//         type="checkbox"
//         value={item.packed}
//         onChange={() => toggleItem(item.id)}
//       />
//       <span style={item.packed ? { textDecoration: "line-through" } : {}}>
//         {item.quantity} {item.description}
//       </span>
//       <button onClick={() => deleteItem(item.id)}>❌</button>
//     </li>
//   );
// }
// function Counter({ items }) {
//   if (!items.length) {
//     return <p className="stats">Add some item to get ready to depart 🛍️🚙</p>;
//   }
//   const itemCount = items.length;
//   const packedCount = items.filter((item) => item.packed).length;
//   const packedPercentage = ((packedCount / itemCount) * 100).toFixed(2);

//   return (
//     <div className="stats">
//       <p>
//         {packedPercentage === 100
//           ? "You have got everything! ready to go ✈️"
//           : `💼 You have ${itemCount} items on your list, and you already packed
//         ${packedCount} (${packedPercentage}%)`}
//       </p>
//     </div>
//   );
// }
