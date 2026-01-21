import { Router } from "express";
import { toggleVideoLike } from "../controllers/like.model";

const router =Router()

router.route("/like-video").get(toggleVideoLike)

export default router


