import express from 'express';
import routes from "./routes/productRoutes.js"

const app = express();

app.use("/products", routes);

app.listen(3000, ()=>{
    console.log("running")
})