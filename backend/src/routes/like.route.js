import { Router } from "express";
import { toggleVideoLike } from "../controllers/like.controller..js";
import verifyJWT from "../middleware/auth.middleware.js";
import { GetVideoLikes } from "../controllers/video.controller.js";

const router =Router()

router.route("/like-video/:videoId").get(verifyJWT, toggleVideoLike)
router.route("/aysi/:videoID").get(GetVideoLikes)
export default router


