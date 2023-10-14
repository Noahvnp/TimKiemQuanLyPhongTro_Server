import express from "express";
import * as postController from "../controllers/post";

import verifyToken from "../middlewares/verifyToken";

const router = express.Router();

router.get("/all", postController.getPosts);
router.get("/limit", postController.getPostsLimit);
router.get("/latest_posts", postController.getLatestPosts);

router.use(verifyToken);
router.post("/create_post", postController.createNewPost);
router.get("/limit_admin", postController.getPostsLimitAdmin);
router.put("/update_post", postController.updatePostAdmin);

export default router;
