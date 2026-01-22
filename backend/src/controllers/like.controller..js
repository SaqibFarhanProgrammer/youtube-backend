import mongoose, { isValidObjectId } from 'mongoose';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Like } from '../models/likes.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import { Video } from '../models/video.models.js';

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  
  const userID = req.user?._id;
  
  if (!userID) throw new ApiError(401, 'please login');
  //TODO: toggle like on video
  const video = await Video.findOne({
    _id:videoId
  });

  if (!video) throw new ApiError(401, 'video to be like not found');

  const exitingLike = await Like.findOne({
    video: videoId,
    likeBy: userID,
  });

  if (exitingLike) {
    await Like.deleteOne({
      _id: exitingLike._id,
    });

    return res.status(200).json(new ApiResponse(200, 'delete like succefully'));
  }

  await Like.create({
    video: videoId,
    likeBy: userID,
  });

  return res.status(200).json(new ApiResponse(200, 'liked toggled'));
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  //TODO: toggle like on comment
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  //TODO: toggle like on tweet
});

const getLikedVideos = asyncHandler(async (req, res) => {
  //TODO: get all liked videos
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
