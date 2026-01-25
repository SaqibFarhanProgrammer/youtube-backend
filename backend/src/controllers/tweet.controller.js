import mongoose, { isValidObjectId } from 'mongoose';
import { Tweet } from '../models/tweet.model.js';
import { User } from '../models/User.models.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

const createTweet = asyncHandler(async (req, res) => {
  //TODO: create tweet
  const { content } = req.body;
  const userID = req.user?._id;

  if (!userID) throw new ApiError(401, 'please login');
  const user = await User.findById(userID);
  if (!user) throw new ApiError(404, 'User not found');
  const tweet = await Tweet.create({
    content,
    owner: userID,
  });
  return res
    .status(201)
    .json(new ApiResponse(201, 'Tweet created successfully', tweet));
});

const getUserTweets = asyncHandler(async (req, res) => {
  // TODO: get user tweets
  const userID = req.user?._id;

  const tweets = await User.aggregate([
    { $match: { _id: userID } },
    {
      $lookup: {
        from: 'tweets',
        localField: '_id',
        foreignField: 'owner',
        as: 'tweets',
      },
    },
  ]);

  console.log(tweets[0].tweets);
  return res
    .status(200)
    .json(new ApiResponse(200, 'Tweet get successfully', tweets));
});

const updateTweet = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { tweetId } = req.params;
  const userID = req.user?._id;

  if (!userID) throw new ApiError(401, 'please login');
  if (!content) throw new ApiError(400, 'content is required');

  const tweet = await Tweet.findById(tweetId);
  if (!tweet) throw new ApiError(404, 'tweet not found');

  if (!tweet.owner === userID)
    throw new ApiError(401, 'unauthorized to update tweet');

  const updatedTweet = await Tweet.findByIdAndUpdate(
    tweetId,
    { content },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, 'Tweet updated successfully', updatedTweet));
});

const deleteTweet = asyncHandler(async (req, res) => {
  //TODO: delete tweet
  const { tweetId } = req.params;
  const userID = req.user?._id;

  if (!userID) throw new ApiError(401, 'please login');
  const tweet = await Tweet.findById(tweetId);
  if (!tweet) throw new ApiError(404, 'tweet not found');
  if (tweet.tweetedBy.toString() !== userID.toString())
    throw new ApiError(401, 'unauthorized to delete tweet');
  await Tweet.findByIdAndDelete(tweetId);
  return res
    .status(200)
    .json(new ApiResponse(200, 'Tweet deleted successfully'));
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
