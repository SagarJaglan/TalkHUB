import User from "../models/user.model.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = asyncHandler(async (req, res, next) => {
  const { fullName, username, password, confirmPassword } = req.body;

  // 1. Validate input
  if (!username || !password || !fullName || !confirmPassword) {
    return next(new errorHandler("All fields are required", 400));
  }
  if (password !== confirmPassword) {
    return next(new errorHandler("Passwords do not match", 400));
  }

  // 2. Check if user exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return next(new errorHandler("User already exists", 409));
  }

  // 3. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 4. Create avatar URL
  const avatar = `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(
    fullName
  )}`;

  // 5. Create and save user
  const newUser = new User({
    username,
    password: hashedPassword,
    fullName,
    avatar,
  });

  await newUser.save();

  // 6. Generate JWT token
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "14d",
  });

  // 7. Respond
  res
    .status(201)
    .cookie("token", token, {
      httpOnly: true, // not accessible via JS
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: "strict", // CSRF protection
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    }) // 7 days expiration
    .json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        fullName: newUser.fullname,
        avatar: newUser.avatar,
        token,
      },
    });
});

export const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  // 1. Validate input
  if (!username || !password) {
    return next(new errorHandler("Username and password are required", 400));
  }

  // 2. Find user
  const user = await User.findOne({ username });
  if (!user) {
    return next(new errorHandler("Invalid credentials", 401));
  }

  // 3. Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new errorHandler("Invalid credentials", 401));
  }

  // 4. Generate JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "14d",
  });

  // 5. Set cookie

  res.cookie("token", token, {
    httpOnly: true, // not accessible via JS
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    sameSite: "strict", // CSRF protection
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days expiration
  });
  res.status(200).json({
    success: true,
    message: "Login successful",
    user: {
      id: user._id,
      username: user.username,
      fullName: user.fullName,
      avatar: user.avatar,
    },
  });
});

export const getProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user.id; // Assuming user ID is set in req.user by auth middleware

  // 1. Find user
  const user = await User.findById(userId).select("-password");
  if (!user) {
    return next(new errorHandler("User not found", 404));
  }

  // 2. Respond with user profile
  res.status(200).json({
    success: true,
    user: {
      _id: user._id,
      username: user.username,
      fullName: user.fullName,
      avatar: user.avatar,
    },
  });
});

export const logout = asyncHandler(async (req, res) => {
  // Clear the cookie
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

export const getOtherUsers = asyncHandler(async (req, res) => {
  
  const otherUsers = await User.find({ _id: { $ne: req.user.id } })
  

  res.status(200).json({
    success: true,
    responseData: otherUsers,
  });
});


// Search users by fullName or username
export const searchUsers = asyncHandler(async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({
      success: false,
      message: "Search query is required",
    });
  }

  const regex = new RegExp(query, "i"); // Case-insensitive search
  const users = await User.find({
    $or: [{ fullName: regex }, { username: regex }],
  }).select("-password");

  res.status(200).json({
    success: true,
    responseData: users,
  });
});