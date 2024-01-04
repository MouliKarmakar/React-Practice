import { useState } from "react";
import "../index.css";
function AccordianItem({ num, title, content }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen((curr) => !curr);
  };
  return (
    <div className={`item ${isOpen ? "open" : ""}`}>
      <ul className="content-box">
        <p className="number">{num <= 9 ? `0${num}` : num}</p>
        <p className="title">{title}</p>
        <p className="icon" onClick={handleToggle}>
          {isOpen ? "+" : "-"}
        </p>
        {isOpen && <p className="cotent-box">{content}</p>}
      </ul>
    </div>
  );
}
export default AccordianItem;
