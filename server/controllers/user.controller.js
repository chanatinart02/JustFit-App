import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";

const createUser = asyncHandler(async (req, res) => {
  const { name, email, avatar } = req.body;

  // check user in DB
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(200).json(userExists);

  // for no user create new user
  const newUser = await User.create({
    name,
    email,
    avatar,
  });

  res.status(200).json(newUser);
});

const getUserInfoByID = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "work!" });
});

const editUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "work!" });
});

export { createUser, getUserInfoByID, editUser };
