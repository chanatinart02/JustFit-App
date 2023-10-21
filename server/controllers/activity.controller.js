import asyncHandler from "express-async-handler";
import Activity from "../models/activity.model.js";
import User from "../models/user.model.js";

const createActivity = asyncHandler(async (req, res) => {
  const {
    typeOfActivity,
    title,
    dateOfActivity,
    duration,
    energyBurn,
    distance,
    description,
    email,
  } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not fond");

  const newActivity = await Activity.create({
    userId: user._id,
    typeOfActivity,
    title,
    dateOfActivity,
    duration,
    energyBurn,
    distance,
    description,
  });
  try {
    const saveActivity = await newActivity.save();

    res.status(201).json(saveActivity);
  } catch (error) {
    // Pass any errors to the error handling middleware
    console.error(error);
  }
});

const getAllActivities = asyncHandler(async (req, res) => {
  res.status(200).send("get all");
});

const updateActivities = asyncHandler(async (req, res) => {
  res.status(200).send("update");
});
const deleteActivities = asyncHandler(async (req, res) => {
  res.status(200).send("delete");
});

export { createActivity, getAllActivities, updateActivities, deleteActivities };
