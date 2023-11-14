import express from "express";

import verifyToken from "../middlewares/verifyToken";
import * as contractControllers from "../controllers/contract";

const router = express.Router();

router.use(verifyToken);
router.post("/", contractControllers.createContract);
router.get("/", contractControllers.getContract);

export default router;
