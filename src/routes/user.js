import express from "express";

import verifyToken from "../middlewares/verifyToken";
import * as userController from "../controllers/user";

const router = express.Router();

router.use(verifyToken);
router.get("/get_current", userController.getCurrentUser);
router.get("/all", userController.getAlltUsers);
router.put("/", userController.updateUser);

export default router;
