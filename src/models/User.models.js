import mongoose from 'mongoose';

const userschema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    Fullname: {
      type: String,
      required: true,
      unique: true,

      trim: true,
      index: true,
    },
    image: {
      type: String, //cloudnery
      required: true,
    },

    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'video',
      },
    ],
    password: {
      type: String,
      required: [true, 'password is required'],
    },
    refreshTokens: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model('User', userschema);
