class ToTry {
    constructor(name) {
        this.name = name;
    }
    ToList(){
        return this.name;
    }
}

let p = new ToTry('help');
let inst = 'ToTry'
// console.log(p instanceof eval(inst));
let jj = Object(p);
console.log(jj);
console.log(p);