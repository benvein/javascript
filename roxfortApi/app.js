import express from "express";
import wizardsRoutes from "./routes/wizardRoutes.js";

const app = express();

app.use(express.json);

app.use("/api", wizardsRoutes);

app.listen(3000, () => {
    console.log("runing on port 3k");
})