import { Router } from "express";
import { toggleVideoLike } from "../controllers/like.controller..js";
import verifyJWT from "../middleware/auth.middleware.js";

const router =Router()

router.route("/like-video/:videoId").get(verifyJWT, toggleVideoLike)

export default router


