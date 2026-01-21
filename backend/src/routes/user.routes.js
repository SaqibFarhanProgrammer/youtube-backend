import { Router } from 'express';
import {
  ChangeAccountDetailsAvatar,
  ChangeAccountDetailsFullname,
  ChangePassword,
  GetCurrentUser,
  getUserChannelProfile,
  getUserWatchHistory,
  loginUser,
  LogoutUser,
  RefreshAccessToken,
  registerUser,
} from '../controllers/user.controllers.js';
import { upload } from '../middleware/multer.js';
import verifyJWT from '../middleware/auth.middleware.js';
const router = Router();

router.route('/register').post(
  upload.fields([
    {
      name: 'Avatar',
      maxCount: 1,
    },
    {
      name: 'CoverPhoto',
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route('/login').post(loginUser);

// ab hua kia mene jo controll yahan per dia ab ye us url ke aagy khudh hi /register lagayega
// or jo resgiteruser hai ab control whaan per jayega jo bhi kaam wahan hoga who hojayega

// secured Routes
router.route('/logout').post(verifyJWT, LogoutUser);
router.route('/refresh-token').post(RefreshAccessToken);
router.route('/change-password').post(verifyJWT, ChangePassword);
router.route('/get-current-user').get(verifyJWT, GetCurrentUser);
router
  .route('/change-account-details-fullname')
  .patch(verifyJWT, ChangeAccountDetailsFullname);
router
  .route('/chnage-account-details-avatar')
  .patch(verifyJWT, upload.single('New_avatar'), ChangeAccountDetailsAvatar);

router.route('/channel/:username').get(verifyJWT, getUserChannelProfile);
router.route('/history').get(verifyJWT, getUserWatchHistory);
export default router;
  