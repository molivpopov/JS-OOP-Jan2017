function solve() {
	// commons
	const Validator = {
		string_1_n(value, n) {
			if (typeof (value) !== 'string' ||
				value.length < 1 || n < value.length) {
				throw Error(`String 1-${n} Symbols`)
			}
		},
		numberPositivNonZero(value) {
			if (typeof (value) !== 'number' ||
				value < 1) {
				throw Error('Postiv Non zero number')
			}
		},
		postivInteger(value) {
			this.numberPositivNonZero(value);
			if (value !== (value | 0)) { throw Error('not Integer') }
		},
		numberInRange(value, start, end) {
			this.numberPositivNonZero(value);
			if (value < start || end < value) {
				throw Error('out of range');
			}
		}
	};
	function CreadID() {
		let id = 0;
		return function () { return id += 1 };
	};
	let IDProduct = CreadID();
	// let types = ['SmartPhone', 'Charger', 'Router', 'Headphones'];


	// My classes
	class Product {
		constructor(manufacturer, model, price) {
			this.manufacturer = manufacturer;
			this.model = model;
			this.price = price;
			this._id = IDProduct();
		}
		// property
		get manufacturer() {
			return this._manufacturer;
		}
		set manufacturer(manufacturer) {
			Validator.string_1_n(manufacturer, 20);
			this._manufacturer = manufacturer;
		}
		get model() {
			return this._model;
		}
		set model(model) {
			Validator.string_1_n(model, 20);
			this._model = model;
		}
		get price() {
			return this._price;
		}
		set price(price) {
			Validator.numberPositivNonZero(price);
			this._price = price;
		}
		get id() {
			return this._id;
		}
		// methods
		getLabel() {
			return `${this.manufacturer} ${this.model} - **${this.price}**`;
		}
	};
	class SmartPhone extends Product {
		constructor(manufacturer, model, price, screenSize, operatingSystem) {
			super(manufacturer, model, price);

			this.screenSize = screenSize;
			this.operatingSystem = operatingSystem;
		}
		//property
		get screenSize() {
			return this._screenSize;
		}
		set screenSize(screenSize) {
			Validator.numberPositivNonZero(screenSize);
			this._screenSize = screenSize;
		}
		get operatingSystem() {
			return this._operatingSystem;
		}
		set operatingSystem(operatingSystem) {
			Validator.string_1_n(operatingSystem, 10);
			this._operatingSystem = operatingSystem;
		}

		// methods
		getLabel() {
			return `SmartPhone - ${super.getLabel()}`
		}
	};
	class Charger extends Product {
		constructor(manufacturer, model, price, outputVoltage, outputCurrent) {
			super(manufacturer, model, price);

			this.outputVoltage = outputVoltage;
			this.outputCurrent = outputCurrent;
		}
		// property
		get outputCurrent() {
			return this._outputCurrent
		}
		set outputCurrent(outputCurrent) {
			Validator.numberInRange(outputCurrent, 100, 3000);
			this._outputCurrent = outputCurrent;
		}
		get outputVoltage() {
			return this._outputVoltage
		}
		set outputVoltage(outputVoltage) {
			Validator.numberInRange(outputVoltage, 5, 20);
			this._outputVoltage = outputVoltage;
		}

		// methods
		getLabel() {
			return `Charger - ${super.getLabel()}`
		}
	};
	class Router extends Product {
		constructor(manufacturer, model, price, wifiRange, lanPorts) {
			super(manufacturer, model, price);

			this.wifiRange = wifiRange;
			this.lanPorts = lanPorts;
		}
		// property
		get wifiRange() {
			return this._wifiRange
		}
		set wifiRange(wifiRange) {
			Validator.numberPositivNonZero(wifiRange);
			this._wifiRange = wifiRange;
		}
		get lanPorts() {
			return this._lanPorts
		}
		set lanPorts(lanPorts) {
			Validator.postivInteger(lanPorts);
			this._lanPorts = lanPorts;
		}

		// methods
		getLabel() {
			return `Router - ${super.getLabel()}`
		}
	};

	class Headphones extends Product {
		constructor(manufacturer, model, price, quality, hasMicrophone) {
			super(manufacturer, model, price);

			this.quality = quality;
			this.hasMicrophone = hasMicrophone;
		}
		// property
		get quality() {
			return this._quality
		}
		set quality(quality) {
			if (
				'high' !== quality &&
				'mid' !== quality &&
				'low' !== quality
			) { throw Error('Invalid quality'); }
			this._quality = quality;
		}
		get hasMicrophone() {
			return this._hasMicrophone
		}
		set hasMicrophone(hasMicrophone) {
			if (hasMicrophone)
			{ this._hasMicrophone = true }
			else
			{ this._hasMicrophone = false }
		}

		// methods
		getLabel() {
			return `Headphones - ${super.getLabel()}`
		}
	};
	class HardwareStore {
		constructor(name) {
			Validator.string_1_n(name, 20);
			this._name = name;
			this.products = [];
			this._quantitys = [];
			this._earnedMoney = 0;
		}
		get name() {
			return this._name;
		}

		// methods
		stock(product, quantity) {
			Validator.postivInteger(quantity);
			if (
				!(product instanceof Product)
			) {
				throw Error('not actual product');
			}

			if (this.products.some(x => x.id === product.id)) {
				this._quantitys[product.id] += quantity;
				return this
			};

			this.products.push(product);
			this._quantitys[product.id] = quantity;
			return this
		}

		sell(productId, quantity) {
			Validator.postivInteger(quantity);

			if (this._quantitys[productId] >= quantity) {
				this._quantitys[productId] -= quantity;
				let index = this.products.findIndex(x => x.id === productId);
				this._earnedMoney += this.products[index].price * quantity;

				if (this._quantitys[productId] === 0) {
					this.products.splice(index, 1);
				}

				return this;
			}

			throw Error('invalid selling');
		}

		getSold() {
			return this._earnedMoney;
		}

		search(options) {
			let res = this.products.slice();

			if (typeof (options) === 'string') {
				let str = options;
				res = res.filter(x =>
					x.model.toLowerCase().includes(str) ||
					x.manufacturer.toLowerCase().includes(str));
				return res.map(x => { return { product: x, quantity: this._quantitys[x.id] } });
			}

			// string - search pattern
			if (options.modelPattern) {
				res = res.filter(x => x.model.includes(options.modelPattern));
			}

			if (options.manufacturerPattern) {
				res = res.filter(x => x.manufacturer.includes(options.manufacturerPattern));
			}

			if (options.type) {
				res = res.filter(x => (x instanceof eval(options.type)));
			}

			if (options.maxPrice) {
				res = res.filter(x => x.price <= options.maxPrice)
			}

			if (options.minPrice) {
				res = res.filter(x => x.price >= options.minPrice)
			}

			return res.map(x => { return { product: x, quantity: this._quantitys[x.id] } });
		}
	};

	return {
		getSmartPhone(manufacturer, model, price, screenSize, operatingSystem) {
			return new SmartPhone(manufacturer, model, price, screenSize, operatingSystem);
		},
		getCharger(manufacturer, model, price, outputVoltage, outputCurrent) {
			return new Charger(manufacturer, model, price, outputVoltage, outputCurrent);
		},
		getRouter(manufacturer, model, price, wifiRange, lanPorts) {
			return new Router(manufacturer, model, price, wifiRange, lanPorts);
		},
		getHeadphones(manufacturer, model, price, quality, hasMicrophone) {
			return new Headphones(manufacturer, model, price, quality, hasMicrophone);
		},
		getHardwareStore(name) {
			return new HardwareStore(name);
		}
	};
}

module.exports = solve; // DO NOT SUBMIT THIS LINE