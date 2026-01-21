import mongoose, { isValidObjectId } from 'mongoose';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Video } from '../models/video.models.js';
import { UploadOnCloudinery } from '../utils/cloudinery.js';
import asyncHandler from '../utils/asyncHandler.js';

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title && !description) {
    throw new ApiError(401, 'title and description requierd');
  }

  const thumbnail_local_path = req.files?.multer_thumbnail[0]?.path;
  const video_local_path = req.files?.multer_video[0]?.path;
  if (!thumbnail_local_path)
    throw new ApiError(401, 'uploaded thumbnail from req.files is  not found');
  if (!video_local_path)
    throw new ApiError(401, 'uploaded video from req.files is  not found');
  const thumbnail_cloudinery = await UploadOnCloudinery(thumbnail_local_path);
  const video_cloudinery = await UploadOnCloudinery(video_local_path);

  if (!thumbnail_cloudinery)
    throw new ApiError(401, 'failed to upload thumbnail on cloudinery');
  if (!video_cloudinery)
    throw new ApiError(401, 'failed to upload video on cloudinery');

  const { url, duration } = video_cloudinery;

  const MongoDB_video = await Video.create({
    title,
    description,
    VideoURL: url,
    thumbnail: thumbnail_cloudinery.url,
    duration: duration,
    time: 10,
    isPublished: true,
    views: 0,
  });

  if (!MongoDB_video) {
    throw new ApiError(500, 'error to create a video on mongodb ');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, 'video uploaded succecfully '));
});

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  //TODO: get all videos based on query, sort, pagination

  let filter = {
    isPublished: true,
  };

  if (query) {
    filter.$or = [{ title: query }, { description: query }];
  }
  const skip = (page - 1) * limit;

  const videos = await Video.find(filter).skip(skip).limit(limit);

  return res
    .status(200)
    .json(new ApiResponse(200, 'fetched videos succefully ', videos));
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!videoId) throw new ApiError(401, 'video not found');
  //TODO: get video by id
  const video = await Video.findById(videoId);

  res
    .status(200)
    .json(new ApiResponse(200, 'videofetched succeccfully', video));
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: update video details like title, description, thumbnail
  const { title, description } = req.body;
  const NewThumbnailLocalFilePath = req.file.path;
  if (!NewThumbnailLocalFilePath)
    throw new ApiError(401, 'tthumbnail not found');

  const NewThumbnail_Cloudinery = await UploadOnCloudinery(
    NewThumbnailLocalFilePath
  );

  if (!NewThumbnail_Cloudinery)
    throw new ApiError(500, 'failed to upload new thumbnail oon cloudinery');

  const video = await Video.findById(videoId);
  if (!video) throw new ApiError(401, 'video not found to update');

  video.title = title;
  video.description = description;
  video.thumbnail = NewThumbnail_Cloudinery.url;

  video.save({
    validateBeforeSave: true,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, 'video updated successfully'));
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoID } = req.params;
  //TODO: delete video

  if (await Video.deleteOne({ _id: videoID })) {
    return res
      .status(200)
      .json(new ApiResponse(200, 'video deleted successfully'));
  } else {
    return res.status(500).json(new ApiResponse(500, 'failed to delete video'));
  }
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(401, 'video not found to toggle private or publish');
  }

  video.isPublished = video.isPublished === false ? true : false;

  video.save({
    validateBeforeSave: true,
  });

  return res.status(200).json(new ApiResponse(200, 'toggled succecfully'));
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
