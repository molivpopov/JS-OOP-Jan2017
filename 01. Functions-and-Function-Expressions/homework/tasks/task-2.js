/* Task description */
/*
	Write a function that finds all the prime numbers in a range
		1) it should return the prime numbers in an array
		2) it must throw an Error if any on the range params is not convertible to `Number`
		3) it must throw an Error if any of the range params is missing
*/

function solve() {
		return function(...items){
	if(items[0] === undefined || items.length !== 2){
		throw Error ('have not a valid range');
	}

	for (let item = 0; item<items.length; item += 1){
		items[item] = Number(items[item]);
		if (isNaN(items[item])){
			throw Error ('params is not convertible to `Number`');
		}
	}
	let beginRange = Math.min(items[0], items[1]);
	let endRange = Math.max(items[0], items[1]);

	let primes = [];
	for (let i = beginRange; i <= endRange; i += 1){
		if (IsPrime(i)){
			primes.push(i);
		}
	}
	return primes;
	
	function IsPrime (numberToCheck){
		if (numberToCheck <= 1) return false;
		if (numberToCheck <= 3) return true;

		for (let i = 2; i <= numberToCheck / 2 ; i += 1){
			if (numberToCheck % i === 0){
				return false;
			}	
		}
		return true;
	}
}
}

module.exports = solve;
