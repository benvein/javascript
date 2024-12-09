import input from './input.js';

let a = await input("side a: ");
let b = await input("side b: ");
let c = await input("side c: ");

function isTriangle(a, b, c){
    a = Number(a);
    b = Number(b);
    c = Number(c);

    if((a + b > c) && (a + c > b) && (b + c > a)){
        return true;
    }
    else{
        return false;
    }
}

console.log(isTriangle(a, b, c));