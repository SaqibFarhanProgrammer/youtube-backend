import mongoose from 'mongoose';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { Comment } from '../models/comments.model.js';
import { Video } from '../models/video.models.js';

const getVideoComments = asyncHandler(async (req, res) => {
  //TODO: get all comments for a video
  const { videoId } = req.params;

  const video = await Video.findOne({
    _id: videoId,
  });

  if (!video) throw new ApiError(401, 'video not found');

  const comments = await Video.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(videoId) },
    },

    {
      $lookup: {
        from: 'comments',
        localField: '_id',
        foreignField: 'video',
        as: 'comments',
      },
    },
    {
      $addFields: {
        commentsCount: { $size: '$comments' },
        commentList: '$comments',
      },
    },
  ]);

  const { page = 1, limit = 10 } = req.query;

  return res
    .status(200)
    .json(new ApiResponse(200, 'get video comments succefully'));
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
  if (!content) {
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
  const { comment_content, commentid } = req.body;

  if (!comment_content) throw new ApiError(401, 'content is requierd');

  const comment = await Comment.findById(commentid);

  comment.content = comment_content;

  comment.save({
    validateBeforeSave: true,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, 'comment update succefully'));
});

const deleteComment = asyncHandler(async (req, res) => {
  // TODO: delete a comment
  const { commentid } = req.body;

  if (await Comment.deleteOne({ _id: commentid })) {
    return res
      .status(200)
      .json(new ApiResponse(200, 'comment delte succefully'));
  } else {
    return res
      .status(400)
      .json(new ApiResponse(400, 'faiiled to delte comment'));
  }
});

export { getVideoComments, addComment, updateComment, deleteComment };
