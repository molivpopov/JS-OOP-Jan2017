function solve() {
  class Product {
    constructor(productType, name, price) {
      this.productType = productType;
      this.name = name;
      this.price = Number(price);
    }
  }

  class ShoppingCart {
    constructor() {
      this.products = [];
    }
    add(product) {
      this.products.push(product);
      return this;
    }
    remove(product) {
      if (!this.products.some(x => x === product)) {
        throw 'cant delete missing product'
      }
      var indexToDelete = this.products.findIndex(x => x === product);
      console.log(indexToDelete);
      this.products.splice(indexToDelete, 1);
      return this;
    }
    showCost() {
    }
    showProductTypes() {
    }
    getInfo() {
    }
  }
  return {
    Product, ShoppingCart
  };
}
var pr = solve();
var product = new pr.Product("Sweets", "Shokolad Milka", 2);
var shoping = new pr.ShoppingCart();
shoping.add(product);
shoping.remove(product);