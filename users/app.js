import express from 'express';
import __dirname from "./util/rootpath.js";

const app = express();
app.use(express.json());

const users = [
    { firstName: "Harry", lastName: "Potter" },
    { firstName: "Ronald", lastName: "Bilius Weasley" },
    { firstName: "Hermione", lastName: "Jean Granger" },
    { firstName: "Draco", lastName: "Malfoy" },
    { firstName: "Cedric", lastName: "Diggory" },
    { firstName: "Luna", lastName: "Lovegood" },
];

app.get("/users", (req,res)=>{
    res.send(users);
});

app.get("/users/:id", (req,res)=>{
    const user = req.params.id;
    res.json(users[user]);
});

app.post("/users", (req,res)=>{
    const {firstName, lastName} = req.body;
    console.log(`name: ${firstName} ${lastName}`);
    res.json(firstName, lastName);
});

app.post("/users/:id", (req,res)=>{
    const user = req.params.id;
    const {firstName, lastName} = req.body;
    res.json(users[user]);
});

app.patch("/users/:id", (req,res)=>{
    const user = req.params.id;
    const {firstName, lastName} = req.body;
    res.json(users[user]);
});

app.delete("/users/:id", (req,res)=>{
    const user = req.params.id;
    res.json(users[user]);
});


app.listen(3003, ()=>{
    console.log("running");
});