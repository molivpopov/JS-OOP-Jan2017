function ka(yy) {
    let a = yy;
    return function(b){a += 1};
}

let b = ka(3);
console.log(typeof(b));
console.log(typeof(ka));
console.log(b.length);