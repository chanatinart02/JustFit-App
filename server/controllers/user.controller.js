import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import "dotenv/config";

const createUser = asyncHandler(async (req, res) => {
  const { name, email, avatar, uid } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(200).json(userExists);
  }

  const newUser = await User.create({
    name,
    email,
    avatar,
    uid,
  });

  res.status(201).json(newUser); // 201 for resource created
});

const getUserInfoByID = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ _id: id });

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

const updatesUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, gender, age, height, weight, avatar } = req.body;

  const updateUser = await User.findOneAndUpdate(
    { _id: id },
    { name, gender, age, height, weight, avatar },
    {
      new: true,
    }
  );

  if (!updateUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(updateUser);

  // res.status(500).json({ message: "Internal server error" });
});

export { createUser, getUserInfoByID, updatesUser };
