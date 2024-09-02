import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Catalog from "./pages/Catalog";
import Product from "./pages/Product";
import { Car } from "./utils/car";
import { useEffect } from "react";

// CREO UN OBJETO car A PARTIR DE LA CLASE Car
const car = new Car();

function App() {
  useEffect(() => {
    // METO MI OBJETO car DENTRO DEL localStorage EN FORMATO JSON
    window.localStorage.setItem("car", JSON.stringify(car));
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/product">
          {/* AL PONER LOS ":" ESTAMOS HACIENDO UNA QUERY(CONSULTA), 
          EN ESTE CASO id ES UN PARAMETRO DE LA URL*/}
          <Route path=":id" element={<Product />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
