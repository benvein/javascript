import fs from 'fs';
import path from 'path';
import __dirname from "./rootpath.js";

const filePath = path.join(__dirname, "data", "cars.json");

export const getData = () => {
    try{
        const content = fs.readFileSync(filePath, "utf8");
        const data = JSON.parse(content);
        return data;
    } catch(err){
        console.log(`Error: ${err.message}`);
        return;
    }
}

export const saveData = (data) => {
    try{
        fs.writeFileSync(filePath, JSON.stringify(data));
    } catch(err){
        console.log(err);
    }
}