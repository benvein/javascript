import input from './input.js';

//is this a triangle
let a = await input("a: ");
let b = await input("b: ");
let c = await input("c: ");

function isItATriangle(a, b, c){
    a = Number(a);
    b = Number(b);
    c = Number(c);

    if((a+b>c) && (a+c>b) && (b+c)>a){
        return true;
    }

    return false;
}

console.log(isItATriangle(a,b,c));

//time convert

let time = await input("time: ");

function returnTime(time){
    let hour = 0;
    let minute = 0;
    let x = time/60;
    if(time<=0){
        return "00:00";
    } else{
        hour = Math.floor(x);
        minute = time - hour*60;
    }
    return hour + ":" + minute;
}

console.log(returnTime(time));

//credit card mask

let text = await input("text: ");

function MaskIt(text){
    if(text.length<=4){
        return text;
    }

    const masked = "#".repeat(text.length - 4);
    const vis = text.slice(-4);

    return masked + vis;
}

console.log(MaskIt(text));

//number of digit tiers

let num = await input("num: ");

function digitTiers(num){
    let x = num.split('');
    let arr = [];
    let y = "";

    for (let i = 0; i < x.length; i++) {
        y += x[i];
        arr.push(y);
    }
    
    return arr;
}

let array = digitTiers(num);

for(var i of array){
    console.log(i);
}