function solve() {

	var products = [];

	// FUNCTION to sort
	function sortString(a, b) {
		if (a > b) return 1;
		if (a < b) return -1;
		return 0;
	}
	// To Validate input parametars for product
	function validateProduct(value, type) {
		//if (
		//	typeof (value) !== type ||
		//	value === null
		//) {
		//	throw 'wrong input parametars';
		//}
		return value;
	}

	// FUNCTION to transform input data to Object
	function getProduct(productType, name, price) {
		let product = {
			productType: validateProduct(productType, 'string'),
			name: validateProduct(name, 'string'),
			price: validateProduct(price, 'number')
		}
		return product;
	}

	function getShoppingCart() {

		products = [];
		return {
			products: products,

			// FUNCTION ADD
			add: function (product) {
				this.products.push(product);
				return this;
			},

			// FUNCCTION Remove
			remove: function (product) {
				let indexToRemove = this.products.findIndex(x =>
					x.name === product.name &&
					x.price === product.price &&
					x.productType === product.productType);
				if (indexToRemove === -1) {
					throw 'have no product to delete'
				}
				this.products.splice(indexToRemove, 1);
				return this;
			},

			// show coast
			showCost: function () {
				let coast = 0;
				this.products.forEach(x => coast += x.price);
				return coast;
			},

			// show product
			showProductTypes: function () {
				let uniqueProductTypes = [];

				this.products.forEach(x => {
					if (!uniqueProductTypes.some(y => y === x.productType))
					{ uniqueProductTypes.push(x.productType) };
				});

				uniqueProductTypes.sort(function (a, b) { return sortString(a, b) });
				return uniqueProductTypes;
			},

			// Get Info
			getInfo: function () {
				let uniqueNames = [];
				let quantity, ttlPrice;
				this.products.forEach(x => {
					if (!uniqueNames.some(y => y.name === x.name)) {
						quantity = 0, ttlPrice = 0;
						this.products.forEach(z => {
							if (z.name === x.name) {
								quantity += 1;
								ttlPrice += z.price;
							}
						});
						uniqueNames.push({ name: x.name, totalPrice: ttlPrice, quantity: quantity });
					};
				});

				uniqueNames.sort(function (a, b) { return sortString(a.name, b.name) });
				return {
					products: uniqueNames,
					totalPrice: this.showCost()
				};
			}
		}
	}

	return {
		getProduct: getProduct,
		getShoppingCart: getShoppingCart
	};
}

module.exports = solve();