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
    Avatar: {
      type: String, //cloudnery
      required: true,
    },

    CoverPhoto: {
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
  try {
    if (!this.isModified('password')) return next();
    this.password = await BCRYPT.hash(this.password, 10);
    next();
  } catch (error) {
    console.log(error);
  } 
}); 

userschema.methods.isPasswordCorrect = async function (password) {
  return await BCRYPT.compare(password, this.password);
};

userschema.methods.generateAccessToken = function () {
  return JWT.sign(
    {
      _id: this._id,
      username: this.username,
      password: this.password,
      fullname: this.fullname,
    },

    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userschema.methods.generateRefreshToken = function () {
  return JWT.sign(
    {
      _id: this._id,
    },

    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model('User', userschema);
