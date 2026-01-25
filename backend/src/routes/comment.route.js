import { Router } from 'express';
import {
  addComment,
  deleteComment,
  updateComment,
} from '../controllers/comment.controller.js';
import verifyJWT from '../middleware/auth.middleware.js';

const router = Router();

router.route('/add-comment/:videoId').post(verifyJWT, addComment);
router.route('/delete-comment').post(verifyJWT, deleteComment);
router.route('/update-comment').post(verifyJWT, updateComment);

export default router;
