import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductsById } from "../services/store.services";

function Product() {
  // RECIBO EL id QUE TIENE LA URL COMO PARAMETRO Y LO GUARDO EN UNA CONST (ES UN HOOK)
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // LLAMA A LA FUNCION QUE TRAE UN PRODUCTO DE LA API Y SETEA EL ESTADO product
  async function getProduct() {
    const data = await fetchProductsById(id);
    setProduct(data);
  }

  // EJECUTA LA FUNCION getProduct SOLO CUANDO VOY A LA PAGE DONDE SE EJECUTA Product
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center bg-slate-400">
      {!product ? (
        <div>Cargando producto...</div>
      ) : (
        <div className="flex flex-col justify-start items-center w-1/3 gap-4 bg-slate-300 py-2 px-3">
          <span className="font-bold underline">{product.title}</span>
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
        </div>
      )}
    </div>
  );
}

export default Product;
