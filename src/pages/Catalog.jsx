import { useEffect, useState } from "react";
import { fetchProducts } from "../services/store.services";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

function Catalog() {
  const [products, setProducts] = useState([]);

  // LLAMA A LA FUNCION DEL SERVICIO QUE TRAE TODOS LOS PRODUCTOS DE LA API Y SETEA EL ESTADO products
  async function getProducts() {
    const data = await fetchProducts();
    setProducts(data);
  }

  // EJECUTA LA FUNCION getProducts SOLO CUANDO CARGA LA PÁGINA Catalog
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <NavBar />
      <div className="h-full w-screen bg-slate-400">
        <h1 className="font-bold text-5xl py-10 text-center ">Productos</h1>
        <ul className="w-full h-full flex flex-wrap gap-5 justify-center ">
          {products // SI LOS PRODUCTOS ESTÁN CARGADOS, MAPEA Y MUESTRA LOS PRODUCTOS
            ? products.map((product, index) => (
                <Link
                  to={`/product/${product.id}`}
                  key={index}
                  className="border rounded-lg bg-white h-96 w-1/4 flex flex-col items-center justify-evenly shadow-xl shadow-slate-500 hover:shadow-slate-900 hover:bg-slate-200 py-2 px-3 "
                >
                  <span className="font-bold underline">
                    {product.title.toUpperCase()}
                  </span>
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
                </Link>
              ))
            : false}
        </ul>
      </div>
    </>
  );
}

export default Catalog;
