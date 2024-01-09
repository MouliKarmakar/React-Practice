import React from "react";
import ReactDOM from "react-dom/client";
import StarRating from "./Components/Star-rating";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating maxRate={10} /> */}
  </React.StrictMode>
);
