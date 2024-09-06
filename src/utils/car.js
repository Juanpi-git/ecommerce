// CREO LA CLASE PRODUCT (PRODUCTO) QUE RECIBE COMO PARÁMETROS:
// ID, TITULO, CATEGORÍA, PRECIO, DESCRIPCIÓN, IMAGEN Y CANTIDAD
export class Product {
  constructor(id, title, category, price, description, image, quantity) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.price = price;
    this.description = description;
    this.image = image;
    this.quantity = quantity;
    this.subtotal = price * quantity;
  }
}

// CREO LA CLASE CAR (CARRITO) QUE RECIBE COMO PARÁMETROS:
// PRODUCTOS, TOTAL Y CANTIDAD
export class Car {
  constructor(products, total, quantity) {
    this.products = products || [];
    this.total = total || 0;
    this.quantity = quantity || 0;
  }

  // MÉTODO PARA AGREGAR UN PRODUCTO AL CARRITO
  addToCar(newProduct) {
    let existe = this.products.some((product) => product.id === newProduct.id);
    if (existe) {
      //SI EL PRODUCTO YA EXISTE EN EL CARRITO, AUMENTA LA CANTIDAD Y EL SUBTOTAL
      this.products.map((product) => {
        if (newProduct.id === product.id) {
          product.quantity++;
          product.subtotal = product.price * product.quantity;
        }
        return product;
      });
    } else {
      //AGREGA UN PRODUCTO AL CARRITO SI NO EXISTE
      this.products.push(newProduct);
    }
    // ACTUALIZA EL TOTAL Y LA CANTIDAD DEL CARRITO
    this.total = this.products.reduce((acc, curr) => acc + curr.subtotal, 0); // EL MÉTODO reduce ITERA products Y VA ACUMULANDO EL SUBTOTAL Y LA CANTIDAD
    this.quantity = this.products.reduce((acc, curr) => acc + curr.quantity, 0); // SUMANDO LO QUE YA HABÍA MÁS LO QUE APORTA CADA PRODUCTO QUE SE AGREGA AL car
  }

  // MÉTODO PARA ELIMINAR UN PRODUCTO DEL CARRITO
  removeFromCar(productId) {
    //ELIMINA UN PRODUCTO DEL CARRITO BUSCANDO POR EL ID, DISMINUYENDO LA CANTIDAD Y ACTUALIZANDO EL SUBTOTAL

    // PRIMERO MAPEA LOS PRODUCTOS BUSCANDO POR EL ID Y DISMINUYENDO LA CANTIDAD
    this.products = this.products
      .map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity - 1,
            subtotal: product.price * (product.quantity - 1),
          };
        }
        return product;
      })
      // FILTRA LOS PRODUCTOS SIN CANTIDAD Y DEVUELVE UN ARRAY CON SOLAMENTE LOS PRODUCTOS
      // QUE NO TIENEN CANTIDAD 0
      .filter((product) => product.quantity !== 0);

    // ACTUALIZA EL TOTAL Y LA CANTIDAD DEL CARRITO
    this.total = this.products.reduce((acc, curr) => acc + curr.subtotal, 0);
    this.quantity = this.products.reduce((acc, curr) => acc + curr.quantity, 0);
  }

  // MÉTODO PARA VACIAR EL CARRITO
  unfillCar() {
    this.products = [];
    this.total = 0;
    this.quantity = 0;
  }

  // MÉTODO PARA OBTENER LOS PRODUCTOS DEL CARRITO
  getProducts() {
    return this.products;
  }

  // MÉTODO PARA OBTENER EL TOTAL DEL CARRITO
  getTotal() {
    return this.total;
  }

  // MÉTODO PARA OBTENER LA CANTIDAD DEL CARRITO
  getQuantity() {
    return this.quantity;
  }
}
