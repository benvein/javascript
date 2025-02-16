import express from 'express';
import __dirname from "./utils/rootpath.js";

const app = express();

app.get("/", (req, res) => {
    res.sendFile("./views/index.html", {root:__dirname});
})

app.get("/cars", (req, res) => {
    res.sendFile("./views/cars.html", {root:__dirname});
})

app.use((req, res) => {
    res.sendFile("./views/404.html", {root:__dirname});
})

app.listen(3000, () => {
    console.log("running");
})
