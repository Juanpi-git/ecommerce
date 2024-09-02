const rootUrl = "https://fakestoreapi.com/products";

// HACE LA LLAMADA A LA API Y TRAE LOS PRODUCTOS
export async function fetchProducts() {
  const res = await fetch(rootUrl);
  const data = await res.json();
  return data;
}

// TRAE UN SOLO PRODUCTO DE LA API
export async function fetchProductsById(productId) {
  const res = await fetch(rootUrl + `/${productId}`);
  const data = await res.json();
  return data;
}
