/* Task Description */
/* 
	Write a function that sums an array of numbers:
		numbers must be always of type Number
		returns `null` if the array is empty
		throws Error if the parameter is not passed (undefined)
		throws if any of the elements is not convertible to Number	

*/
function solve() {
	return function sum(...items) {

		//if (items[0] === undefined) {
		//	throw Error('undefined input parametars');
		//}

		items = items[0];

		if (items.length === 0) {
			return null;
		}

		let result = 0;
		for (let item of items) {
			let number = Number(item);
			//console.log(typeof (item));
			if (isNaN(number)) {
			//if (typeof (item) !== 'Number') {
				throw Error('have a not number element');
			}

			result += number;
		}
		return result;
	}
}
//solve(['2', '4', '3']);
module.exports = solve;