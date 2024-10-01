import input from './input.js';

const year = await input("év: ");

if(year%4==0){
    console.log("leap year")
}
else{
    console.log("not leap year")
}