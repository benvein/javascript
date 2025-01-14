import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import input from './input.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, 'adatok.json');

const users = [
    { id: 1, name: 'John Doe'},
    {id:2,name:'Doe Jhon'},
    {id:3,name:'Joe'}
]
let counter = 0;
let num = 3;
while(counter < 3){
    var list = {};
    list.id = num++;
    list.name = await input("név: ");
    users.push(list);
    counter++;
}

try{
    fs.writeFileSync(filePath, JSON.stringify(users));
} catch(err){
    console.log(err);
}

function readData(){
    let content = '';
    try{
        content = fs.readFileSync(filePath, 'utf-8');
    } catch(err){
        console.log(err);
    }
    console.log(content);

    const newdata = JSON.parse(content);
    console.log(newdata);
}

