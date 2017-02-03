var products = [{ name: 'pesho', price: 2 }, { name: 'gosho', price: 2 }];
//var products = [1, 2, 3, 6, 7, 9];
function remove(arr) {
   // var ttl = 0;
    var p = arr.reduce(function (ttl, i) { return ttl + i }, 0)

    console.log(p);
}
//remove(6);
remove([1, 5, 7, 8]);

