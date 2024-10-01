import input from './input.js';

const name = await input('Kérem a név :3 :');
console.log(`A neved ${name}`);

let a = await input("él 1: ");
let b = await input("él 2: ");
let c = await input ("él 3: ");

let volume = a*b*c;
let surfaceArea = 2*(a*b + a*c + c*b);

console.log(`Volume: ${volume}\nSurface area: ${surfaceArea}`);

let hours = await input("ora: ");
let minutes = await input("perc: ");
let seconds = await input("masodperc: ");

let currTimeInSec =  hours*60*60+minutes*60+seconds;
let secInADay = 24*60*60;

let remainingSec = secInADay-currTimeInSec;

console.log(remainingSec);