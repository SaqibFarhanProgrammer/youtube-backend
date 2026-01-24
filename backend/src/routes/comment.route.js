import { Router } from "express";
import { addComment } from "../controllers/comment.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";

const router = Router()


router.route("/add-comment/:videoId").post( verifyJWT,addComment)

export default router