import express from "express";
import * as provinceController from "../controllers/province";

const router = express.Router();

router.get("/all", provinceController.getProvincesController);

export default router;
