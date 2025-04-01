import express from "express";
import * as wizardsControllers from "../controllers/wizardsControllers.js";

const router = express.Router();

router.get("/wizards", wizardsControllers.getAllWizards);

router.get("/wizards/:id", wizardsControllers.getWizardById);

router.post("/wizards", wizardsControllers.createWizard);

router.put("/wizards/:id", wizardsControllers.updateWizard);

router.delete("/wizards/:id", wizardsControllers.deleteWizard);

export default router;