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

export class Car {
  constructor() {
    this.products = [];
    this.total = 0;
    this.quantity = 0;
  }

  addToCar(product) {
    this.products.map((p) => {
      if (p.id == product.id) {
        return {
          ...product,
          quantity: product.quantity + 1,
          subtotal: product.price * (product.quantity + 1),
        };
      } else {
        this.products.push(product);
      }
    });
    // EL MÉTODO reduce ITERA products Y VA ACUMULANDO EL SUBTOTAL Y LA CANTIDAD
    // SUMANDO LO QUE YA HABÍA MÁS LO QUE APORTA CADA PRODUCTO QUE SE AGREGA AL car
    this.total = this.products.reduce((acc, curr) => acc + curr.subtotal, 0);
    this.quantity = this.products.reduce((acc, curr) => acc + curr.quantity, 0);
  }

  removeFromCar(productId) {
    this.products.map((product, index) => {
      if (product.id == productId && product.quantity == 1) {
        return this.products.splice(index, 1);
      } else if (product.id == productId && product.quantity != 1) {
        return {
          ...product,
          quantity: product.quantity - 1,
          subtotal: product.price * (product.quantity - 1),
        };
      }
    });
  }

  unfillCar() {
    this.products = [];
    this.total = 0;
    this.quantity = 0;
  }

  getProducts() {
    return this.products;
  }

  getTotal() {
    return this.total;
  }

  getQuantity() {
    return this.quantity;
  }
}
