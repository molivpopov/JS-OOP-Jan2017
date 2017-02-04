var products = [{ name: 'pesho', price: 2 }, { name: 'gosho', price: 2 }];
//var products = [1, 2, 3, 6, 7, 9];
function remove(arr) {
    // var ttl = 0;

    var idBook = createId();
    var idTd = createId();

    console.log(idBook());
    console.log(idBook());
    console.log(idBook());
    console.log(idTd());
    console.log(idTd());
    console.log(idTd());
}
function createId() {
    var id = 0;
    return function () {
        id += 1;
        return id;
    }
}
//remove(6);
remove([1, 5, 7, 8]);

