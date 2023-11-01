import express from "express";

import verifyToken from "../middlewares/verifyToken";
import * as rentalController from "../controllers/rental";

const router = express.Router();

router.use(verifyToken);
router.post("/", rentalController.rental);
router.get("/renter", rentalController.getRenters);

export default router;
