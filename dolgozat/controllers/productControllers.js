import products from '../data/products.js';

export const getAll = (res,req) => {
    res.status(200).json(products);
}

export const getById = (req,res) => {
    const id = req.params.id;
    if(id<0 || id>=products.length){
        res.status(404).json({message: "not found"})
    }
    res.status(200).json(products[id]);
}

export const createProd = (req,res) => {
    const {name, category, price, avaliable} = req.body;
    if(!name || !category || !price || !avaliable){
        res.status(404).json();
    }
    const newProd = {name, category, price, avaliable};
    products.push(newProd);
    res.status(201).json(newProd);
}

export const updateProd = (req,res) => {
    const {name, category, price, avaliable} = req.body;
    const id = req.params.id;
    if(!name || !category || !price || !avaliable){
        res.status(404).json();
    }
    if(id<0 || id>=products.length){
        res.status(404).json({message: "not found"})
    }
    res.status(200).json(products[i]);
}

export const deleteProd = (req,res) => {
    const id = req.params.id;
    if(id<0 || id>=products.length){
        res.status(404).json({message: "not found"})
    }
    products.splice(id, 1);
    res.status(200).json(products[id]);
}