import express from "express";
import * as db from "./data/user.js";

const router = express.Router();

router.get("/", (req,res)=>{
    res.send('Users');
});

router.get("/users", (req,res)=>{
    const users = db.getUsers();
    res.status(200).json(users);
});

router.get("/users/:id", (req,res)=>{
    const user = db.getUserById(+req.params.id);
    if(!user){
        return res.status(404).json({message: "usernot found"});
    }
    res.status(200).json(user);
});

router.post("/users", (req,res)=>{

});

router.put("/users/:id", (req,res)=>{

});

router.delete("/users/:id", (req,res)=>{

});


export default router;