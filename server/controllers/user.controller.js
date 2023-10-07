import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createUser = asyncHandler(async (req, res) => {
  const { name, email, avatar } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(200).json(userExists);
  }

  const newUser = await User.create({
    name,
    email,
    avatar,
  });

  res.status(201).json(newUser); // 201 for resource created
});

const getUserInfoByID = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

const updatesUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const updateUser = await User.findByIdAndUpdate(id, updates, { new: true });

  if (!updateUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(updateUser);

  res.status(500).json({ message: "Internal server error" });
});

export { createUser, getUserInfoByID, updatesUser };