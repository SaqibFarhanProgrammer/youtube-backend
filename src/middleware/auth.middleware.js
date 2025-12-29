import JWT from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { User } from '../models/User.models.js';

 const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      (await req.cookies?.accessToken) ||
      req.header('Authorization').replace('Bearer ', ' ');

    if (!token) throw new ApiError(401, 'UnAuthorized Request');

    const decodedtoken = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedtoken?._id).select(
      '-password -refreshTokens'
    );

    if (!user) throw new ApiError(401, 'invelid access Token');

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error.message);
  }
});

export default verifyJWT
