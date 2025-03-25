import products from "../data/products.js"

export const getAllProds = (req,res) => {
    res.status(200).json(products);
}

export const getProdById = (req,res) => {
    const id = req.params.id;
    if(id<0 || id>=products.length){
        res.status(404).json({message: "product not found"});
    }
    res.status(200).json(products[id]);
}

export const createProd = (req,res) => {
    const {name, category, price, avaliable} = req.body;
    if(!name || !category || !price || !avaliable){
        res.status(400).json({message: "missing data"});
    }
    const newProd = {name, category, price, avaliable};
    products.push(newProd);
    res.status(201).json(newProd);
}

export const updateProd = (req,res) => {
    const id = req.params.id;
    if(id<0 || id>=products.length){
        res.status(404).json({message: "product not found"});
    }
    const {name, category, price, avaliable} = req.body;
    if(!name || !category || !price || !avaliable){
        res.status(400).json({message: "missing data"});
    }
    products[id] = {name, category, price, avaliable};
    res.status(200).json(products[id]);
}

export const deleteProd = (req,res) => {
    const id = req.params.id;
    if(id<0 || id>=products.length){
        res.status(404).json({message: "product not found"});
    }
    products.splice(id,1);
    res.status(200).json({message: "deelted"});
}