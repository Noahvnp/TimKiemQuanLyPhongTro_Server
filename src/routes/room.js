import express from "express";

import verifyToken from "../middlewares/verifyToken";
import * as roomController from "../controllers/room";

const router = express.Router();

router.use(verifyToken);
router.post("/", roomController.createRoom);
router.get("/", roomController.getRooms);

export default router;
