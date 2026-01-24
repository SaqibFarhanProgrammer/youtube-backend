import asyncHandler from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/User.models.js';
import { UploadOnCloudinery } from '../utils/cloudinery.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import JWT from 'jsonwebtoken';
import mongoose from 'mongoose';

const generateAccesAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            'user not found in gen acces token and ref token fnc'
          )
        );
    }
    const accesToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    await User.findByIdAndUpdate(
      user._id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    return { accesToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, 'somthing went wrong');
  }
};

// register user code here:
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, username, Fullname } = req.body;
  if (
    [email, password, username, Fullname].some((fields) => fields.trim() === '')
  )
    throw new ApiError('All fields are required', 400);
  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existedUser) throw new ApiError('User already exists', 409);

  const avatarLocalPath = req.files?.Avatar[0]?.path;
  // const coverPhotoLocalPath =  req.files?.CoverPhoto[0]?.path;

  let coverPhotoLocalPath;

  if (
    req.files &&
    Array.isArray(req.files.CoverPhoto) &&
    req.files.CoverPhoto.length > 0
  ) {
    coverPhotoLocalPath = req.files.CoverPhoto[0].path;
  }

  if (!avatarLocalPath) throw new ApiError('Avatar is required', 400);
  //   .................................................
  const avatarPhoto = await UploadOnCloudinery(avatarLocalPath);
  const coverPhoto = await UploadOnCloudinery(coverPhotoLocalPath);
  if (!avatarPhoto) throw new ApiError('Faild to upload avatar photo', 500);

  //   .................................................
  const userdata = await User.create({
    email,
    password,
    username: username.toLowerCase(),
    Fullname,
    Avatar: avatarPhoto.url,
    CoverPhoto: coverPhoto?.url || '',
  });

  //   .................................................
  const createdUser = await User.findById(userdata._id).select(
    '-password -refreshTokens'
  );
  if (!createdUser) throw new ApiError('Faild to create user', 500);

  //   .................................................
  return res
    .status(201)
    .json(new ApiResponse(true, 'User created successfully', createdUser, 201));
});
// tested ✅

// Login User COde Here:
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email) throw new ApiError('email is required');
  const user = await User.findOne({ email });

  if (!user) throw new ApiError('invelid cridintiols');

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) throw new ApiError('invelid Password ');

  const { accesToken, refreshToken } = await generateAccesAndRefreshToken(
    user._id
  );

  const loggedinUser = await User.findById(user._id).select(
    '-password -refreshTokens'
  );

  const options = {
    httpOnly: false,
    secure: true,
    sameSite: 'none',
    maxAge: 2 * 24 * 60 * 60 * 1000,
  };

  return res
    .status(200)
    .cookie('accessToken', accesToken, options)
    .cookie('refreshToken', refreshToken, {
      httpOnly: false,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json(
      new ApiResponse(true, 'user login sucessfully', {
        User: accesToken,
        userdata: loggedinUser,
        refreshToken,
      })
    );
});
// tested ✅

// Logout User Code Here:
const LogoutUser = asyncHandler(async (req, res) => {
  await User.findOneAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshTokens: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    HttpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie('accessToken', options)
    .json(new ApiResponse(200, 'user loggedout'));
});
// tested ✅

// refresh refresh token ocde here:
const RefreshAccessToken = asyncHandler(async (req, res) => {
  const incommingRefreshToken =
    req.cookies.refreshToken || req.nody.refreshToken;
  if (!incommingRefreshToken) throw new ApiError(401, 'unautjorized error');

  try {
    const decodedinfo = JWT.verify(
      incommingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedinfo?._id);
    if (!user) throw new ApiError(401, 'invelid refresh token');

    if (incommingRefreshToken !== user?.refreshTokens) {
      throw new ApiError(401, 'refresh token is expire or invelid');
    }

    const { accesToken, newrefreshToken } = await generateAccesAndRefreshToken(
      user._id
    );

    return res
      .status(200)
      .cookie('accessToken', accesToken, {
        httpOnly: true,
        secure: true,
      })
      .cookie('refreshToken', newrefreshToken, {
        httpOnly: true,
        secure: true,
      })
      .json(
        new ApiResponse(
          200,
          { accesToken, newrefreshToken },
          'access token refreshd'
        )
      );
  } catch (error) {
    throw new ApiError(401, 'invelid access token ', error.message);
  }
});

const ChangePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(501, 'user is not found in cahnge password func');
  }
  if (!user?.isPasswordCorrect(oldPassword)) {
    throw new ApiError(401, " old password isn't currect ");
  }
  user.upassword = newPassword;
  user.save({
    validateBeforeSave: true,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, 'password changed successfully'));
});
// tested ✅

const GetCurrentUser = asyncHandler(async (req, res) => {
  console.log(req.user);

  return res.status(200).json(200, req.user, 'user fethed successfully');
});
// tested ✅

const ChangeAccountDetailsFullname = asyncHandler(async (req, res) => {
  const { fullname } = req.body;
  console.log(fullname);

  if (!fullname) throw new ApiError(401, 'fullname is requierd');
  const user = await User.findById(req.user?._id);
  user.Fullname = fullname;
  user.save({
    validateBeforeSave: true,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, 'fullname  update successfully'));
});
// tested ✅

const ChangeAccountDetailsAvatar = asyncHandler(async (req, res) => {
  const LocalAvatarFilePath = req.file?.path;

  if (!LocalAvatarFilePath) throw new ApiError(401, 'Avatar is requierd');

  const Avatar = await UploadOnCloudinery(LocalAvatarFilePath);

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        Avatar: Avatar.url,
      },
    },
    { new: true }
  ).select('-password');
  return res
    .status(200)
    .json(new ApiResponse(200, user, 'Avatar update successfully'));
});
// tested ✅

const getUserChannelProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;

  if (!username) throw new ApiError(400, 'username is missing');

  const channel = await User.aggregate([
    {
      $match: {
        username: username.toLowerCase(),
      },
    },
    {
      $lookup: {
        from: 'subscriptions',
        localField: '_id',
        foreignField: 'channel',
        as: 'subscribers',
      },
    },
    {
      $lookup: {
        from: 'subscriptions',
        localField: '_id',
        foreignField: 'subscriber',
        as: 'subscribedTo',
      },
    },
    {
      $addFields: {
        subscribersCount: {
          $size: '$subscribers',
        },
        channelSubscribedToCount: {
          $size: '$subscribedTo',
        },
        isSubscribed: {
          $cond: {
            if: {
              $in: [req.user?._id, '$subscribers.subscriber'],
            },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        username: 1,
        Fullname: 1,
        Avatar: 1,
        CoverPhoto: 1,
        subscribersCount: 1,
        channelSubscribedToCount: 1,
        isSubscribed: 1,
      },
    },
  ]);

  if (!channel?.length) {
    throw new ApiError(404, 'channel does not exist');
  }

  console.log(channel);

  return res
    .status(200)
    .json(new ApiResponse(200, channel[0], 'channel found succesfully'));
});
// tested ✅

const getUserWatchHistory = asyncHandler(async (req, res) => {
  const user = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: 'videos',
        localField: 'watchHistory',
        foreignField: '_id',
        as: 'watchHistoryData',
        pipeline: [
          {
            $lookup: {
              from: 'users',
              localField: 'owner',
              foreignField: '_id',
              as: 'owner',
              pipeline: [
                {
                  $project: {
                    username: 1,
                    Avatar: 1,
                    Fullname: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              owner: {
                $first: '$owner',
              },
            },
          },
        ],
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user[0].watchHistoryData,
        ' watch history data fetched succesfully'
      )
    );
});
// tested ✅

export {
  registerUser,
  loginUser,
  LogoutUser,
  RefreshAccessToken,
  GetCurrentUser,
  ChangePassword,
  ChangeAccountDetailsFullname,
  ChangeAccountDetailsAvatar,
  getUserChannelProfile,
  getUserWatchHistory,
};
