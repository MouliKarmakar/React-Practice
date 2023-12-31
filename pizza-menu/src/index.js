import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import pizzaData from "./data";
function App() {
  return (
    <>
      <Header />
      <Menu />
      <Footer />
    </>
  );
}

function Pizza(props) {
  return (
    <div className={`pizza ${props.isSoldout ? "sold-out" : ""}`}>
      <img src={props.img} alt="" />
      <div className="pizza-details">
        <p>{props.title}</p>
        <p>{props.info}</p>
        <p>{props.isSoldout ? "SOLD OUT" : props.price}</p>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Fast React Pizza CO.</h1>
    </header>
  );
}

function Menu() {
  return (
    <main className="menu">
      <h3>OUR MENU</h3>
      <p>
        Authentic Italian cusine. 6 creative dishes to choose from. All from our
        stone oven, all organic, all delicious.
      </p>
      <div className="pizzas">
        {pizzaData.map((pizza) => {
          return (
            <Pizza
              key={pizza.name}
              img={pizza.photoName}
              title={pizza.name}
              price={pizza.price}
              isSoldout={pizza.soldOut}
              info={pizza.ingredients}
            />
          );
        })}
      </div>
      {/* <div className="pizzas">
        <Pizza
          img="../pizzas/focaccia.jpg"
          title="Focaccia"
          info="Bread with Italian olive oil and rosemary"
        />
        <Pizza
          img="../pizzas/spinaci.jpg"
          title="Pizza Spinachi"
          info="Tomato, mozarella, spinach,ricotta cheese"
        />
        <Pizza
          img="../pizzas/funghi.jpg"
          title="Pizza Funghi"
          info="Tomato, mozarella, mushrooms, and onion"
        />
        <Pizza
          img="../pizzas/margherita.jpg"
          title="Pizza Margherita"
          info="Tomato and mozarella"
        />
        <Pizza
          img="../pizzas/salamino.jpg"
          title="Pizza Salamino"
          info="Tomato, mozerilla and pepperioni"
        />
        <Pizza
          img="../pizzas/prosciutto.jpg"
          title="Pizza Prosciutto"
          info="Tomato, mozerilla and pepperioni"
        />
      </div> */}
    </main>
  );
}

function Footer() {
  return (
    <footer className="footer order">
      <p>We are open till 22:00. Come visit Us or Order online </p>
      <button className="btn ">Order now</button>
    </footer>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
