import mongoose from 'mongoose';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { Comment } from '../models/comments.model.js';
import { Video } from '../models/video.models.js';

const getVideoComments = asyncHandler(async (req, res) => {
  //TODO: get all comments for a video
  const { videoId } = req.params;

  const { page = 1, limit = 10 } = req.query;
});

const addComment = asyncHandler(async (req, res) => {
  // TODO: add a comment to a video

  const { videoId } = req.params;

  //TODO: toggle like on video
  const video = await Video.findOne({
    _id: videoId,
  });

  if (!video) throw new ApiError(401, 'video to be comment not found');

  const { content } = req.body;
  if (!content ) {
    return res
      .status(400)
      .json(new ApiResponse(400, 'comment content is requierd'));
  }

  const comment = await Comment.create({
    content: content,
    video: videoId,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, comment, 'add comment succefylly'));
});

const updateComment = asyncHandler(async (req, res) => {
  // TODO: update a comment
});

const deleteComment = asyncHandler(async (req, res) => {
  // TODO: delete a comment
});

export { getVideoComments, addComment, updateComment, deleteComment };
