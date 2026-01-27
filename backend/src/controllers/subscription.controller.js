import mongoose, { isValidObjectId } from 'mongoose';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { Subscription } from '../models/subscription.model.js';
const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelID } = req.params;
  // TODO: toggle subscription

  if (!isValidObjectId(channelID)) {
    throw new ApiError(400, 'Invalid channel ID');
  }

  const subscriberId = req.user?._id;

  if (subscriberId === channelID) {
    throw new ApiError(400, 'Cannot subscribe to your own channel');
  }
  const existingSubscription = await Subscription.findOne({
    channel: channelID,
    subscriber: subscriberId,
  });

  console.log(existingSubscription);

  if (existingSubscription) {
    // Unsubscribe
    await Subscription.deleteOne({ _id: existingSubscription._id });
    return res
      .status(200)
      .json(new ApiResponse(true, 'Unsubscribed successfully'));
  }
  // Subscribe
  const newSubscription = await Subscription.create({
    channel: channelID,
    subscriber: subscriberId,
  });
  await newSubscription.save();

  res.status(201).json(new ApiResponse(true, 'Subscribed successfully'));
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  if (!channelId) {
    throw new ApiError(400, 'Invalid channel ID');
  }

  const subscribers = await Subscription.find({ channel: channelId });
  console.log(subscribers);

  res
    .status(200)
    .json(new ApiResponse(true, 'Channel subscribers fetched', subscribers));
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;
  if (!isValidObjectId(subscriberId)) {
    throw new ApiError(400, 'Invalid subscriber ID');
  }
  const subscriptions = await Subscription.find({
    subscriber: subscriberId,
  }).populate('channel');

  res
    .status(200)
    .json(new ApiResponse(true, 'Subscribed channels fetched', subscriptions));
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
