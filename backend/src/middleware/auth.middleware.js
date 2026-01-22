import JWT from 'jsonwebtoken'
import { ApiError } from '../utils/ApiError.js'
import asyncHandler from '../utils/asyncHandler.js'
import { User } from '../models/User.models.js'

const verifyJWT = asyncHandler(async (req, res, next) => {
  const authHeader = req.header('Authorization')

  const token =
    req.cookies?.accessToken ||
    authHeader?.replace('Bearer ', '')

  if (!token) {
    throw new ApiError(401, 'Unauthorized request')
  }

  const decoded = JWT.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET
  )

  const user = await User.findById(decoded._id).select(
    '-password -refreshTokens'
  )

  if (!user) {
    throw new ApiError(401, 'Invalid access token')
  }

  
  req.user = user
  
  next()
})

export default verifyJWT
