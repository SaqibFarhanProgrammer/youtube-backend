import { Router } from 'express';
import { createTweet, getUserTweets, updateTweet } from '../controllers/tweet.controller.js';
import verifyJWT from '../middleware/auth.middleware.js';

const router = Router();

router.route('/create-tweet').post(verifyJWT, createTweet);
router.route('/update-tweet/:tweetId').post(verifyJWT, updateTweet);
router.route('/get-tweets').get(verifyJWT, getUserTweets);

export default router;
