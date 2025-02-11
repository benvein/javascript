import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import input from './input.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, 'dobasok.txt');

let throws = [];

let content = '';
try{
    content = fs.readFileSync(filePath, 'utf-8');
} catch(err){
    console.log(err);
}

throws = content.split(', ');


let place = 0;
let count = 0;

for (let i = 0; i < throws.length; i++) {
    throws[i] = parseInt(throws[i]);

}

for (let num of throws) {
    place += num;
    process.stdout.write(`${place}, `)

    if(place%10==0){
        place-=3;
        count++;
    }
}

if(place>=45){
    console.log("\na jatekot befejezte");
}
console.log("szamlalo");
console.log(count);
console.log("vegso hely")
console.log(place);