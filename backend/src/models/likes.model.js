import mongoose from 'mongoose';
const likesSchema = new mongoose.Schema(
  {
    comment: {
      type: mongoose.Types.ObjectId(),
      ref: 'Comment',
    },
    video: {
      type: mongoose.Types.ObjectId,
      ref: 'Video',
    },
    likeBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    comment: {
      type: mongoose.Types.ObjectId,
      ref: 'Comment',
    },
  },
  {
    timestamps: true,
  }
);

export const Like = mongoose.model('Like', likesSchema);
