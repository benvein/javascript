import express from "express";
import productsRouters from "./routers/productsRouters.js";

const app = express();

app.use(express.json);

app.use("/api", productsRouters);

app.listen(3000, ()=>{
    console.log("runnig");
})