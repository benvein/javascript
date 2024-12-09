import input from './input.js';

let num = await input("szam: ");

function isItSquare(num){
    if(Math.sqrt(num)%1==0 && num != 1){
        return true;
    }
    else{return false;}
}

console.log(isItSquare(num));