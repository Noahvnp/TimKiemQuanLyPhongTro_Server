import express from "express";

import verifyToken from "../middlewares/verifyToken";
import * as overviewController from "../controllers/overview";

const router = express.Router();

router.use(verifyToken);
router.get("/", overviewController.getOverview);

export default router;
