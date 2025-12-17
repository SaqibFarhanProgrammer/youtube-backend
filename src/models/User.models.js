import mongoose from 'mongoose';

import JWT from 'jsonwebtoken';
import BCRYPT from 'bcrypt';
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

userschema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = BCRYPT.hash(this.password, 10);
});

export const User = mongoose.model('User', userschema);
