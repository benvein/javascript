import express from 'express';
import path from 'path';    
import __dirname from "./util/rootpath.js";
import * as fileHandler from "./util/filekezeles.js";

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))

const users = fileHandler.getData();

app.get("/users", (req,res)=>{
    const users = fileHandler.getData();
    res.json(users);
});

app.get("/users/:id", (req,res)=>{
    const users = fileHandler.getData();
    const id = req.params.id;
    if(id<0 || id>=users.length){
        return res.json({});
    }
    res.json(users[id]);
});

app.post("/users", (req,res)=>{
    const users = fileHandler.getData();
    const {firstName, lastName} = req.body;
    const newUser = {firstName, lastName}
    users.push(newUser);
    fileHandler.saveData(users);
    res.json(newUser);
});

app.put("/users/:id", (req,res)=>{
    const users = fileHandler.getData();
    const id = req.params.id;
    if(id<0 || id>=users.length){
        return res.json({message: "user not found"});
    }
    const {firstName, lastName} = req.body;
    users[id] = {firstName, lastName};
    fileHandler.saveData(users);
    res.json(users[id]);
});

app.patch("/users/:id", (req,res)=>{
    const users = fileHandler.getData();
    const id = req.params.id;
    if(id<0 || id>=users.length){
        return res.json({message: "user not found"});
    }
    const {firstName, lastName} = req.body;
    users[id] = {
        firstName: firstName || users[id].firstName, 
        lastName: lastName || users[id].lastName
    };
    fileHandler.saveData(users);
    res.json(users[id]);
});

app.delete("/users/:id", (req,res)=>{
    const users = fileHandler.getData();
    const id = req.params.id;
    if(id<0 || id>=users.length){
        return res.json({message: "user not found"});
    }
    users.splice(id,1);
    fileHandler.saveData(users);
    res.json({message: "deelete susccccesful"});
});


app.listen(3003, ()=>{
    console.log("running");
});