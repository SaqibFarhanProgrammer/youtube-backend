import mongoose, { isValidObjectId } from 'mongoose';
import { Playlist } from '../models/playlist.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  //TODO: create playlist

  if (!name) {
    throw new ApiError(400, 'Playlist name is required');
  }
  const newPlaylist = await Playlist.create({
    name,
    description,
    owner: req.user?._id,
    videos: [],
  });

  await newPlaylist.save();

  res.status(201).json(new ApiResponse(true, 'Playlist created', newPlaylist));
});

const getUserPlaylists = asyncHandler(async (req, res) => {


  const { userId } = req.user?._id;
  console.log(userId);
  

  if (!userId) {
    throw new ApiError(400, 'Invalid user ID');
  }

  const playlists = await Playlist.find({ owner: userId }).populate('videos');


  res
    .status(200)
    .json(new ApiResponse(true, 'User playlists fetched', playlists));
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, 'Invalid playlist ID');
  }

  const playlist = await Playlist.findById(playlistId).populate('videos');

  if (!playlist) {
    throw new ApiError(404, 'Playlist not found');
  }
  res.status(200).json(new ApiResponse(true, 'Playlist fetched', playlist));
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;

  if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
    throw new ApiError(400, 'Invalid playlist ID or video ID');
  }

  const playlist = await Playlist.findById(playlistId);

  if (!playlist) {
    throw new ApiError(404, 'Playlist not found');
  }

  if (playlist.videos.includes(videoId)) {
    throw new ApiError(400, 'Video already in playlist');
  }
  playlist.videos.push(videoId);
  await playlist.save({ validateBeforeSave: false });

  res
    .status(200)
    .json(new ApiResponse(true, 'Video added to playlist', playlist));
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
  // TODO: remove video from playlist
  if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
    throw new ApiError(400, 'Invalid playlist ID or video ID');
  }

  const playlist = await Playlist.findById(playlistId);

  if (!playlist) {
    throw new ApiError(404, 'Playlist not found');
  }

  const videoIndex = playlist.videos.indexOf(videoId);
  if (videoIndex === -1) {
    throw new ApiError(404, 'Video not found in playlist');
  }

  playlist.videos.splice(videoIndex, 1);
  await playlist.save({ validateBeforeSave: false });

  res
    .status(200)
    .json(new ApiResponse(true, 'Video removed from playlist', playlist));
});

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  // TODO: delete playlist
  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, 'Invalid playlist ID');
  }

  const playlist = await Playlist.findById(playlistId);

  if (!playlist) {
    throw new ApiError(404, 'Playlist not found');
  }

  await Playlist.findByIdAndDelete(playlistId);
  res
    .status(200)
    .json(new ApiResponse(true, 'Playlist deleted successfully', null));
});

const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;
  //TODO: update playlist

  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, 'Invalid playlist ID');
  }

  const playlist = await Playlist.findById(playlistId);

  if (!playlist) {
    throw new ApiError(404, 'Playlist not found');
  }

  playlist.name = name || playlist.name;
  playlist.description = description || playlist.description;

  await playlist.save({ validateBeforeSave: false });
  res
    .status(200)
    .json(new ApiResponse(true, 'Playlist updated successfully', playlist));
});

export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
