import express from 'express';
import __dirname from "./utils/rootpath.js";

const app = express();


app.get("/", (req,res)=>{
    res.sendFile("./views/index.html", {root:__dirname});
})

app.listen(3001, ()=>{
    console.log('running');
})