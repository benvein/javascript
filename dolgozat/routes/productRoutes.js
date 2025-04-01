import express from 'express';
import * as prodControllers from '../controllers/productControllers.js'

const routes = express.Router();

routes.get('/products', prodControllers.getAll);
routes.get('/products/:id', prodControllers.getById);
routes.post('/products', prodControllers.createProd);
routes.put('/products/:id', prodControllers.updateProd);
routes.delete('/products/:id', prodControllers.deleteProd);

export default routes;