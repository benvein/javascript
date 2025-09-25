import express from 'express';
import * as db from './util/database.js';

const PORT = 3001;
const app = express();

app.use(express.json());

app.get("/cars", (req,res)=>{
    const cars = getCars();
    res.status(200).json(cars);
});

app.get("/cars/:id", (req,res)=>{
    const car = getCar(+req.params.id);
    if(!car){
        return res.status(404).json({message: "car not found"});
    }
    res.status(200).json(car);
});

app.post("/cars", (req,res)=>{
    const {brand, model} = req.body;
    if(!brand || !model){
        return res.status(400).json({message: "invalid credentials"});
    }
    const saveResult = db.createCar(brand, model);
    const car = db.getCar(saveResult.lastInsertRowid)
    res.status(201).json(car)
});



app.put("/cars/:id", (req,res)=>{
    const id = +req.params.id; 
    let car = db.getCar(id);
    if(!car){
        return res.status(404).json({message: "car not found"});
    }
    const {brand, model} = req.body;
    if(!brand || !model){  
        return res.status(400).json({message: "invalid credentials"});
    } 
    const updated = db.updateCar(brand. model);
    car = db.getCar(id)
    res.status(200).json(car);
})

app.delete("/cars/:id", (req,res)=>{
    db.deleteCar(+req.params.id);
    res.status(200).json({message: "car deleted"});
})

app.listen(PORT, ()=> {
    console.log(`http://localhost:${PORT}`);
})