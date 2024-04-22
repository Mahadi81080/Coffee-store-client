import { useLoaderData } from "react-router-dom";
import "./App.css";
import CoffeeCart from "./Components/CoffeeCart";
import { useState } from "react";

function App() {
  const loadedCoffees = useLoaderData();
  const [coffees,setCoffees]=useState(loadedCoffees)

  return (
    <>
      <h1>Hot Hot Cold Coffee: {coffees.length}</h1>
      <div className="grid grid-cols-2 gap-5">
        {coffees.map((coffee) => (
          <CoffeeCart key={coffee._id} coffee={coffee} coffees={coffees} setCoffees={setCoffees}></CoffeeCart>
        ))}
      </div>
    </>
  );
}

export default App;
