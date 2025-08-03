import { User } from "../models/user.model.js";
import {
  registerSchema,
  signinSchema,
} from "../schema/AuthSchema.js";

import { asyncHandler } from "../utils/Asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";



const refreshTokenOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const genrerateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) throw new ApiError(404, "user not found");

    const accessToken = await user.createAccessToken();
    const refreshToken = await user.createRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while gernrating tokens");
  }
};

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET 
    );

    const user = await User.findById(decodedToken?.id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, refreshToken: newRefreshToken } =
      await genrerateAccessAndRefreshToken(user._id);

    res.clearCookie("refreshToken", { httpOnly: true });

    return res
      .status(200)
      .cookie("refreshToken", newRefreshToken, refreshTokenOptions)
      .json(new ApiResponse(200, { accessToken }, "Access token refreshed"));
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const registerUser = asyncHandler(async function (
  req,
  res,
  next,
) {
  const validatedData = registerSchema.parse(req.body);

  const { email, password, userName } = validatedData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ApiError(400, "User already exists"));
  }

  const user = await User.create({
    email,
    password,
    userName,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken "
  );

  if (!createdUser)
    return next(new ApiError(400, "Something went wrong while creating user"));

  const { accessToken, refreshToken } = await genrerateAccessAndRefreshToken(
    user._id
  );

  return res
    .status(201)
    .cookie("refreshToken", refreshToken, refreshTokenOptions)
    .json(
      new ApiResponse(
        201,
        { user: createdUser, accessToken },
        "user registered Successfully"
      )
    );
});

const loginUser = asyncHandler(async function (
  req,
  res,
  next
) {
  const validatedData = signinSchema.parse(req.body);

  const { email, password } = validatedData;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ApiError(400, "Invalid Credentials"));
  }

  const isMatchPassword = await user.comparePassword(password);

  if (!isMatchPassword) {
    return next(new ApiError(400, "Invalid credentials"));
  }

  const { accessToken, refreshToken } = await genrerateAccessAndRefreshToken(
    user.id
  );

  const logedInUser = await User.findById(user._id).select(
    "-password -refreshToken "
  );

  if (!logedInUser) {
    return next(new ApiError(400, "Something went wrong while signing user"));
  }

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, refreshTokenOptions)
    .json(
      new ApiResponse(
        200,
        { user: logedInUser, accessToken },
        "user signin Successfully"
      )
    );
});

const logoutUser = asyncHandler(
  async (req, res, next) => {
    await User.findByIdAndUpdate(
      req.user?.id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      {
        new: true,
      }
    );
    const options = {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, {}, "signout successfully"));
  }
);

const userData = asyncHandler(
  async (req, res, next) => {
    const user = await User.findOne({
      email:req.user.email
    }).select("-password -refreshToken");

    if (!user) {
      return next(new ApiError(404, "User Not found"));
    }

    res
      .status(200)
      .json(new ApiResponse(200, user, "User Data sended Succesfully"));
  }
);

export { registerUser, logoutUser, loginUser, userData, refreshAccessToken };
