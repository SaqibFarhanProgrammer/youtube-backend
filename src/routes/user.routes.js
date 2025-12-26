import { Router } from 'express';
import { registerUser } from '../controllers/user.controllers.js';
import { upload } from '../middleware/multer.js';
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

// ab hua kia mene jo controll yahan per dia ab ye us url ke aagy khudh hi /register lagayega
// or jo resgiteruser hai ab control whaan per jayega jo bhi kaam wahan hoga who hojayega

export default router;
