import express from "express";
import * as acreageController from "../controllers/acreage";

const router = express.Router();

router.get("/all", acreageController.getAcreagesController);

export default router;
