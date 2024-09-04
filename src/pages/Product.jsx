import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductsById } from "../services/store.services";
import { Car, Product } from "../utils/car";

function ProductDetail() {
  // RECIBO EL id QUE TIENE LA URL COMO PARAMETRO Y LO GUARDO EN UNA CONST (ES UN HOOK)
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // LLAMA A LA FUNCION DEL SERVICIO QUE TRAE UN PRODUCTO POR ID Y SETEA EL ESTADO product
  async function getProduct() {
    const data = await fetchProductsById(id);
    setProduct(data);
  }

  // EJECUTA LA FUNCION getProduct SOLO CUANDO VOY A LA PAGE DONDE SE EJECUTA Product
  useEffect(() => {
    getProduct();
  }, []);

  // ES UNA FUNCIÓN DISTINTA AL addToCar DE LA CLASE Product
  // HACE LO MISMO PERO LA CREO PARA PODER PASARSELA AL BOTON DE "Añadir al carrito"
  function addToCart(product) {
    // CREO UNA INSTACIA DE LA CLASE Product
    const newProduct = new Product(
      product.id,
      product.title,
      product.category,
      product.price,
      product.description,
      product.image,
      1
    );

    //OBTIENE LOS DATOS DEL CARRITO DEL LOCALSTORAGE Y CONSTRUYE UNA INSTANCIA DE CAR
    const carData = JSON.parse(window.localStorage.getItem("car"));

    // CREA UNA INSTANCIA DE CAR CON LOS PRODUCTOS DEL CARRITO
    const car = new Car(carData.products, carData.total, carData.quantity);

    // AGREGA EL PRODUCTO NUEVO AL CARRITO Y GUARDA LOS NUEVOS DATOS EN EL LOCALSTORAGE
    car.addToCar(newProduct);
    window.localStorage.setItem("car", JSON.stringify(car));
  }

  return (
    <div className="w-screen h-screen flex justify-center bg-slate-400">
      {!product ? ( // MUESTRA UN MSJ SI EL PRODUCTO NO ESTA CARGADO
        <div className="flex items-center justify-center h-screen w-screen text-5xl text-slate-700 font-bold">
          Cargando producto...
        </div>
      ) : (
        <div className="flex flex-col justify-start items-center w-1/3 gap-4 bg-slate-300 py-2 px-3">
          <span className="font-bold underline">
            {product.title.toUpperCase()}
          </span>
          <span className="w-full flex justify-center bg-white rounded-lg">
            <img
              src={product.image}
              alt={product.title}
              className="h-60 rounded-lg"
            />
          </span>
          <span>
            <p className="font-semibold inline">Precio: </p>${product.price}
          </span>
          <span>
            <p className="font-semibold inline">Categoría: </p>
            {product.category}
          </span>
          <span>{product.description}</span>
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-slate-700 hover:bg-slate-800 text-white border rounded-lg"
          >
            Agregar al carrito
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
