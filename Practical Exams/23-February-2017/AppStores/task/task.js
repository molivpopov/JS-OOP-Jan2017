
function solve() {

	function id() {
		let id = 1;
		return function () {
			return id += 1;
		}
	}
	let ID = id();

	const Validator = {
		ValidatePositivInteger(num) {
			if (num !== (num | 0) || num < 0) {
				throw Error('must be positiv integer number');
			}
		},
		ValidateIsPositivNumber(num) {
			if (typeof (num) !== 'number' || num < 0) {
				throw Error('must be positiv number');
			}
			return true;
		},
		ValidateString_1_24(str) {
			let patt = /[^a-zA-Z0-9 ]/;
			if (str.length < 1 || 24 < str.length || str.match(patt)) {
				throw Error('wrong string');
			}
		},
		SetCount(count) {
			if (!count) { count = 10 }
			if (count < 1) { count = 10 };
			return count;
		},
		ValidateVersionIsUp(versionNew, versionOld) {
			if (versionNew <= versionOld) {
				throw Error('new version must be above');
			}
			return versionNew;
		},
		ValidateArray(arr) {
			if (!Array.isArray(arr)) {
				throw Error('Missing Array');
			}
		}
	}
	// class
	class App {
		constructor(name, description, version, rating) {
			this.name = name;
			this.description = description;
			this.version = version;
			this.rating = rating;
			this.times = ID();
		}

		// property
		get name() {
			return this._name;
		}
		set name(name) {
			Validator.ValidateString_1_24(name);
			this._name = name;
		}
		get description() {
			return this._description;
		}
		set description(description) {
			if (typeof description !== 'string') {
				throw Error('description must be string');
			}
			this._description = description;
		}
		get version() {
			return this._version;
		}
		set version(version) {
			Validator.ValidateIsPositivNumber(version);
			this._version = version;
		}
		get rating() {
			return this._rating;
		}
		set rating(rating) {
			Validator.ValidatePositivInteger(rating);
			if (0 > rating || 10 < rating) {
				throw Error('rating is out of Range');
			}
			this._rating = rating;
		}

		//methods 
		release(parameter) {

			// parameters is positiv number
			if (typeof (parameter) === 'number') {
				this.version = Validator.ValidateVersionIsUp(parameter, this.version);;
				return this;
			};

			// parameter is object
			if (!parameter.version) {
				throw Error('version is mandatory');
			};
			this.version = Validator.ValidateVersionIsUp(parameter.version, this.version);

			if (parameter.description) {
				this.description = parameter.description;
			}
			if (parameter.rating) {
				this.rating = parameter.rating;
			}
			return this;
		}
	}

	// searshing by pattern case-insensitive
	// add item to res if have match
	function searchByPattern(pattern, arr, res) {
		if (arr instanceof Store) {
			for (let el of arr.apps) {
				if (el.name.toLowerCase().includes(pattern.toLowerCase())) {

					let match = res.find(x => x.name === el.name);

					if (match) {
						if (match.version < el.version) { match.version = el.version; }
					} else {
						res.push(el);
					}
				}
			}
		}
		return
	}

	// class Device
	class Device {
		constructor(hostname, apps) {

			this.hostname = hostname;
			this.apps = apps;	
		}

		// property
		get hostname() {
			return this._hostname;
		}
		set hostname(hostname) {
			if (typeof (hostname) !== 'string' ||
				hostname.length < 1 || 32 < hostname.length) {
				throw Error('Invalid Hostname');
			}

			this._hostname = hostname;
		}
		get apps() {
			return this._apps;
		}
		set apps(apps) {
			Validator.ValidateArray(apps);
			let device = [];

			for (let store of apps) {
				if (store instanceof Store) {
					device.push(store);
				} else {
					device.push(new App(store.name, store.description, store.version, store.rating));
				}
			}

			this._apps = device;
		}
		// methods
		search(pattern) {
			let res = [];
			this.apps.forEach(x => searchByPattern(pattern, x, res));
			return res;
		}

		install(name) {
			let mostRecent = this.search(name);

			if (!mostRecent[0]) {
				throw Error('Can not install null');
			}
			// install only if not installed
			if (!this.apps.find(x => x.name === mostRecent[0].name)) {
				this.apps.push(mostRecent[0]);
			}

			return this;
		}

		uninstall(name) {
			let index = this.apps.findIndex(x => x.name === name);

			if (index < 0) {
				throw Error('Missing name to delete');
			}

			this.apps.splice(index, 1)
			return this;
		}

		listInstalled() {
			return this.apps.sort((a, b) => a.name.localeCompare(b.name));
		}

		update() {
			let installedStore = [];
			let installedApp = [];

			if (this.apps) {
				for (let el of this.apps) {

					if (el instanceof Store) {
						el.apps.forEach(x => installedStore.push(x));
					} else {
						installedApp.push(el);
					}
				}
			}
			for (let el of installedApp) {
				installedStore.forEach(x => {
					if(x.name === el.name){
						el.version = x.version > el.version ? x.version : el.version;
					}
				});
			}
			return this
		}

	}

	// class create
	class Store extends App {
		constructor(name, description, version, rating) {
			super(name, description, version, rating);
			this.apps = [];
		}

		// mehods
		uploadApp(app) {

			// check Validity && make copy
			let extendetApp = new App(app.name, app.description, app.version, app.rating);

			let match = this.apps.find(x => x.name === app.name);

			if (match) {
				match.release(app);
				match.times = ID();
				return this
			}

			this.apps.push(extendetApp);
			return this;

		}

		takedownApp(name) {
			let index = this.apps.findIndex(x => x.name === name);
			if (index < 0) {
				throw Error('Missing aplication to takedown');
			}
			this.apps.splice(index, 1)
			return this;
		}

		search(pattern) {
			return this.apps.filter(x => x.name.toLowerCase().includes(pattern.toLowerCase()));
		}

		listMostRecentApps(count) {
			count = Validator.SetCount(count);
			return this.apps.sort((a, b) => b.times - a.times).slice(0, count);
		}

		listMostPopularApps(count) {
			count = Validator.SetCount(count);
			return this.apps.sort((a, b) => b.rating - a.rating).slice(0, count);
		}
	}

	return {
		createApp(name, description, version, rating) {
			return new App(name, description, version, rating);
		},
		createStore(name, description, version, rating) {
			return new Store(name, description, version, rating);
		},
		createDevice(hostname, apps) {
			return new Device(hostname, apps);
		}
	};
}
// var res = solve();
// let tt = res.createStore('dsecodan', 'description', 4, 7)
// let fAppl = res
// 	.createApp('mite', 'e goliam', 5, 7)
// 	.release({ version: 6, description: 'nov text', rating: 3 });
// tt.uploadApp(fAppl);
// tt.uploadApp(res.createApp('gosho', 'e malak', 4, 4));
// tt.uploadApp(res.createApp('gosho', 'e goliam', 5, 6));
// tt.uploadApp(res.createApp('mite', 'e goliam', 6, 6));
// tt.uploadApp(res.createApp('PeshO', 'e goliam', 2, 2));
// tt.uploadApp(res.createApp('TishO', 'ne goliam', 1, 2));


// console.log(tt.listMostPopularApps());
//console.log(tt.search('sh'));

// Submit the code above this line in bgcoder.com
module.exports = solve;
