import express from "express";
import * as productsControllers from "../controllers/productsControllers.js";

const router = express.Router();

router.get("/product", productsControllers.getAllProds);

router.get("/product/:id", productsControllers.getProdById);

router.push("/product", productsControllers.createProd);

router.put("/product/:id", productsControllers.updateProd);

router.delete("/product/:id", productsControllers.deleteProd);

export default router;