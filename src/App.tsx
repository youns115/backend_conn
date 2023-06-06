// import { useEffect, useState } from "react";
import "./App.css";
// import ProductList from "./components/ProductList";
import Axios from "./components/Axios";

function App() {
  // const [category, setCategory] = useState("");

  return (
    <>
      <div>
        {/* <select
          className="form-select w-25"
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="" disabled>
            select...
          </option>
          <option value="clothing">clothing</option>
          <option value="household">household</option>
        </select>
        <ProductList category={category} /> */}

        <Axios />
      </div>
    </>
  );
}

export default App;
