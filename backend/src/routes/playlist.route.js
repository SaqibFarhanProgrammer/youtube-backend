import { Router } from 'express';
import {
  addVideoToPlaylist,
  createPlaylist,
  deletePlaylist,
  getPlaylistById,
  getUserPlaylists,
  removeVideoFromPlaylist,
  updatePlaylist,
} from '../controllers/playlist.controller.js';
import verifyJWT from '../middleware/auth.middleware.js';
const router = Router();

router.route('/create-playlist').post(verifyJWT, createPlaylist);
router.route('/user-playlists').get(verifyJWT, getUserPlaylists);
router.route('/getplaylist-byid/:playlistId').get(verifyJWT, getPlaylistById);
router.route('/update-playlist/:playlistId').put(verifyJWT, updatePlaylist);
router.route('/:playlistId').delete(verifyJWT, deletePlaylist);
router
  .route('/:playlistId/add-video/:videoId')
  .post(verifyJWT, addVideoToPlaylist);
router
  .route('/:playlistId/remove-video/:videoId')
  .post(verifyJWT, removeVideoFromPlaylist);
export default router;
