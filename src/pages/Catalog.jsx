import { useEffect, useState } from "react";
import { fetchProducts } from "../services/store.services";
import { Link } from "react-router-dom";
import { Car, Product } from "../utils/car";

// ES EL CARRITO EN FORMA DE OBJETO
const carData = JSON.parse(window.localStorage.getItem("car"));
// AHORA CREO UN  OBJETO car (DISTINTO DEL QUE TENGO EN App.jsx) CON LOS DATOS QUE TENGO EN EL localStorage
const car = new Car(carData.products, carData.total, carData.quantity);

function Catalog() {
  const [products, setProducts] = useState([]);

  // LLAMA A LA FUNCION QUE TRAE TODOS LOS PRODUCTOS DE LA API Y SETEA EL ESTADO products
  async function getProducts() {
    const data = await fetchProducts();
    setProducts(data);
  }

  // ES UNA FUNCIÓN DISTINTA AL addToCar DE LA CLASE Product
  // HACE LO MISMO PERO LA CREO PARA PODER PASARSELA AL BOTON DE "Añadir al carrito"
  function addToCar(product) {
    // CREO UN PRODUCTO USANDO LA CLASE Product
    const newProduct = new Product(
      product.id,
      product.title,
      product.category,
      product.price,
      product.description,
      product.image,
      product.quantity
    );

    // AGREGO EL PRODUCTO AL CARRITO
    car.addToCar(newProduct);
  }

  // EJECUTA LA FUNCION getProducts SOLO CUANDO VOY A LA PAGE DONDE SE EJECUTA Catalog
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="h-full w-screen bg-slate-400">
      <h1 className="font-bold text-5xl py-10 text-center ">Productos</h1>
      <ul className="w-full h-full flex flex-wrap gap-5 justify-center ">
        {products
          ? products.map((product, index) => (
              <Link
                to={`/product/${product.id}`}
                key={index}
                className="border rounded-lg bg-white h-96 w-1/4 flex flex-col items-center justify-evenly shadow-xl shadow-slate-500 hover:shadow-slate-900 hover:bg-slate-200 py-2 px-3 "
              >
                <span className="font-bold underline">{product.title}</span>
                <span className="w-full flex justify-center bg-white rounded-lg">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-52 rounded-lg"
                  />
                </span>
                <span>
                  <p className="font-semibold inline">Precio: </p>$
                  {product.price}
                </span>
                <span>
                  <p className="font-semibold inline">Categoría: </p>
                  {product.category}
                </span>
                <button className="w-full bg-slate-700 hover:bg-slate-800 text-white border rounded-lg">
                  Ver
                </button>
                <button
                  onClick={(product) => addToCar(product)}
                  className="w-full bg-slate-700 hover:bg-slate-800 text-white border rounded-lg"
                >
                  Agregar al carrito
                </button>
              </Link>
            ))
          : false}
      </ul>
    </div>
  );
}

export default Catalog;
