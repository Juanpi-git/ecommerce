import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import { Car } from "../utils/car";

function Cart() {
  // CREO UN ESTADO DE TODAS LOS DATOS QUE VOY A USAR
  // const [cart, setCart] = useState(undefined);
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [products, setProducts] = useState(undefined);

  // SE EJECUTA CUANDO SE CARGA LA PÁGINA
  useEffect(() => {
    // OBTIENE LOS DATOS DEL CARRITO DEL LOCALSTORAGE
    const carData = JSON.parse(window.localStorage.getItem("car"));
    // CREA UNA INSTANCIA DE CAR CON LOS PRODUCTOS DEL CARRITO
    const car = new Car(carData.products, carData.total, carData.quantity);
    // setCart(car);
    setTotal(car.getTotal());
    setQuantity(car.getQuantity());
    setProducts(car.getProducts());
  }, []);

  return (
    <>
      <NavBar />
      <div className="h-full w-full flex bg-slate-400">
        <div className="flex flex-col gap-4 w-3/4 p-2">
          {products && products.length > 0 ? ( // SI HAY PRODUCTOS EN EL CARRITO LOS MAPEA Y LOS MUESTRA
            products.map((product, index) => (
              <Link
                to={`/product/${product.id}`}
                key={index}
                className="h-1/5 w-full flex justify-between items-center border rounded-lg bg-white shadow-xl shadow-slate-500 hover:shadow-slate-900 hover:bg-slate-200 py-2 px-3 "
              >
                <div className="flex flex-col justify-center">
                  <span className="font-bold underline">
                    {product.title.toUpperCase()}
                  </span>
                  <span>
                    <p className="font-semibold inline">Precio: </p>$
                    {product.price}
                  </span>
                  <span>
                    <p className="font-semibold inline">Cantidad: </p>
                    {product.quantity}
                  </span>
                </div>
                <span className="w-32 bg-white flex justify-center rounded-lg">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-20 rounded-lg"
                  />
                </span>
              </Link>
            ))
          ) : (
            // SI NO HAY PRODUCTOS EN EL CARRITO NOS AVISA
            <div className="h-screen flex justify-center ">
              <span className="font-bold text-3xl mt-10">
                No hay productos en el carrito
              </span>
            </div>
          )}
        </div>
        <div className="h-full w-1/4 p-2 flex flex-col items-start justify-center">
          {products && products.length > 0 ? ( // SI HAY PRODUCTOS EN EL CARRITO NOS DEJA COMPRAR
            <>
              <span className="">
                <p className="font-semibold inline">Cantidad de productos: </p>
                {quantity}
              </span>
              <span className="mb-2">
                <p className="font-semibold inline">Total: </p>${total}
              </span>
              <button className="rounded-lg p-2 w-full bg-slate-600 text-white hover:bg-slate-700 hover:shadow-lg active:bg-slate-600 ">
                Comprar
              </button>
            </>
          ) : (
            // SI NO HAY PRODUCTOS EN EL CARRITO NO NOS DEJA COMPRAR
            false
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;
