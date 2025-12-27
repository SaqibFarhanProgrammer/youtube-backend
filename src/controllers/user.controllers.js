import asyncHandler from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/User.models.js';
import { UploadOnCloudinery } from '../utils/cloudinery.js';
import { ApiResponse } from '../utils/ApiResponse.js';
// register user code here
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

const loginUser = asyncHandler(async (req, res) => {
  // sabse pehle kaam user se email or password lena
  const { email, password } = req.body;
  // dusra kaam usko validate karna
  if (!email) return new ApiError('email is required');
  if (!password) return new ApiError('password is required');
  // uske abad jo user aya hai usko res mein bhejna
  const LoginUserData = await User.findOne({
    $or: [{ email }, { password }],
  });

  if (!LoginUserData) return new ApiError('invelid cridintiols');

  res
    .status(200)
    .json(new ApiResponse(true, 'user login sucessfully', LoginUserData, 200));
});

export { registerUser, loginUser };
