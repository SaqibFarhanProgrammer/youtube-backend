import { Router } from 'express';
import { upload } from '../middleware/multer.js';
import verifyJWT from '../middleware/auth.middleware.js';
import {
  deleteVideo,
  getVideoById,
  publishAVideo,
  updateVideo,
} from '../controllers/video.controller.js';
const router = Router();

router.route('/upload-video').post(
  verifyJWT,
  upload.fields([
    {
      name: 'multer_thumbnail',
      maxCount: 1,
    },
    {
      name: 'multer_video',
      maxCount: 1,
    },
  ]),
  publishAVideo
);

router.route('/watch/:videoId').get(getVideoById);
router.route('/delete/:videoID').get(deleteVideo);
router
  .route('/update-video/:videoId')
  .post(verifyJWT, upload.single('newThumbnail'), updateVideo);

export default router;
