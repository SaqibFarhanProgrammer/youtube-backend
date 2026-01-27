import { Router } from 'express';
import {  getUserChannelSubscribers, toggleSubscription } from '../controllers/subscription.controller.js';
import verifyJWT from '../middleware/auth.middleware.js';

const router = Router();

router.route('/toggle-subscription/:channelID').get(verifyJWT,toggleSubscription);
router.route('/get-subscriber/:channelId').get(verifyJWT,getUserChannelSubscribers);
export default router;

