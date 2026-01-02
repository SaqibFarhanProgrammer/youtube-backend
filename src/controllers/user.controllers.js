import asyncHandler from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/User.models.js';
import { UploadOnCloudinery } from '../utils/cloudinery.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import JWT from 'jsonwebtoken';

const generateAccesAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accesToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshTokens = refreshToken;
    user.save({ validateBeforeSave: false });
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
    HttpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie('accessToken', accesToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponse(true, 'user login sucessfully', {
        User: accesToken,
        userdata: loggedinUser,
        refreshToken,
      })
    );
});

// Logout User Code Here:
const LogoutUser = asyncHandler(async (req, res) => {
  await User.findOneAndUpdate(
    req.user._id,
    {
      $set: {
        refreshTokens: undefined,
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

    const options = {
      HttpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie('accessToken', accesToken, options)
      .cookie('refreshToken', newrefreshToken, options)
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
  const user = await User.findById(req.body.user?._id);
  if (!user.isPasswordCorrect(oldPassword)) {
    throw new ApiError(401, " old password isn't currect ");
  }
  user.upassword = newPassword;
  user.save({
    validateBeforeSave: true,
  });
  return res.status(200).json(new ApiResponse('password changed successfully'));
});

const GetCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(200, req.user, 'user fethed successfully');
});

const ChangeAccountDetailsFullname = asyncHandler(async (req, res) => {
  const { fullname } = req.body;
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

const ChangeAccountDetailsAvatar = asyncHandler(async () => {
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

export {
  registerUser,
  loginUser,
  LogoutUser,
  RefreshAccessToken,
  GetCurrentUser,
  ChangePassword,
  ChangeAccountDetailsFullname,
  ChangeAccountDetailsAvatar,
};
