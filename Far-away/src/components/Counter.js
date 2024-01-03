import React from "react";

function Counter({ items }) {
  if (!items.length) {
    return <p className="stats">Add some item to get ready to depart 🛍️🚙</p>;
  }
  const itemCount = items.length;
  const packedCount = items.filter((item) => item.packed).length;
  const packedPercentage = ((packedCount / itemCount) * 100).toFixed(2);

  return (
    <div className="stats">
      <p>
        {packedPercentage === 100
          ? "You have got everything! ready to go ✈️"
          : `💼 You have ${itemCount} items on your list, and you already packed
          ${packedCount} (${packedPercentage}%)`}
      </p>
    </div>
  );
}

export default Counter;
