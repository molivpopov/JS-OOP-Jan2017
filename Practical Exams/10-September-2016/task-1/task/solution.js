/* globals module */

"use strict";

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
            this.products.splice(indexToDelete, 1);
            return this;
        }
        
        showCost() {
            let sum = 0;
            this.products.forEach(x => sum += x.price);
            return sum;
        }

        showProductTypes() {
            let productType = [];
            this.products.forEach(x => productType[x.productType] = true);
            productType = Object.keys(productType).sort((a, b) => a.localeCompare(b));
            return productType;
        }

        getInfo() {

            let diffName = [];
            let prices = [];
            let counts = [];

            // find different name in this ShoppingCart
            this.products.forEach(x => {
                prices[x.name] = (prices[x.name] || 0) + x.price;
                counts[x.name] = (counts[x.name] || 0) + 1;
            });
            diffName = Object.keys(prices);

            // group element by name
            let group = [];
            diffName.forEach(x => {
                group.push({ name: x, totalCost: prices[x], quantity: counts[x] });
            });

            return {
                products: group,
                totalPrice: this.products.reduce((ttl, b) => { return ttl + b.price }, 0)
            };

        }
    }
    return {
        Product, ShoppingCart
    };
}

module.exports = solve;