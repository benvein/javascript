import express from 'express';
import path from 'path';
import __dirname from "./util/filekezeles.js";
import * as fileHandler from "./util/filekezeles.js";

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const cars = fileHandler.getData();

app.get("/cars", (req,res)=>{
    const cars = fileHandler.getData();
    res.json(cars);
});

app.get("/cars/:id", (req,res)=>{
    const cars = fileHandler.getData();
    const id = req.params.id;
    if(id<0 || id>=cars.length){
        return res.json({});
    }
    res.json(cars[id]);
});

app.post("/cars", (req,res)=>{
    const cars = fileHandler.getData();
    const {brand, model, year} = req.body;
    const newCar = {brand, model, year};
    cars.push(newCar);
    fileHandler.saveData(cars);
    res.json(newCar);
});

app.put("/cars/:id", (req,res)=>{
    const cars = fileHandler.getData();
    const id = req.params.id;
    if(id<0 || id>=cars.length){
        return res.json({message: "car not found"});
    }
    const {brand, model, year} = req.body;
    cars[id] = {brand, model, year};
    fileHandler.saveData(cars);
    res.json(cars[id]);
});

app.delete("/cars/:id", (req,res)=>{
    const cars = fileHandler.getData();
    const id = req.params.id;
    if(id<0 || id>=cars.length){
        return res.json({message: "car not found"});
    }
    cars.splice(id, 1);
    fileHandler.saveData(cars);
    res.json(cars[id]);
});