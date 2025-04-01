import wizards from "../data/wizards.js";

export const getAllWizards = (req,res) => {
    res.status(200).json(wizards);
}

export const getWizardById = (req,res) => {
    const id = req.params.id;
    if(id<0 || id >= wizards.length){
        return res.status(404).json({message: "wizard not found"});
    }
    res.status(200).wizards[id];
}

export const updateWizard = (req, res) => {
    const id = req.params.id;
    if(id<0 || id >= wizards.length){
        return res.status(404).json({message: "wizard not found"});
    }
    const {name, magicWand, house} = req.body;
    if(!name || !magicWand || !house){
        return res.status(404).json({message: "missing data"});
    }
    wizards[id] = {name, magicWand, house};
    res.status(200).wizards[id];
}

export const createWizard = (req,res) => {
    const {name, magicWand, house} = req.body;
    if(!name || !magicWand || !house){
        return res.status(404).json({message: "missing data"});
    }
    const newWizard = {name, magicWand, house};
    wizards.push(newWizard);
    res.status(201).json(newWizard);
}

export const deleteWizard = (req,res) => {
    const id = req.params.id;
    if(id<0 || id >= wizards.length){
        return res.status(404).json({message: "wizard not found"});
    }
    wizards.splice(id, 1);
    res.status(200).json({message: "delete success"});
}