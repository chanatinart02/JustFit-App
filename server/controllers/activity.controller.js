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
    console.error(error);
  }
});

const getAllActivities = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const activities = await Activity.find({ userId: id }).sort({
    dateOfActivity: -1,
  });

  if (activities) {
    res.status(200).json(activities);
  } else {
    res.status(404).json({ message: "Activities not found" });
  }
});

const updateActivities = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    typeOfActivity,
    title,
    dateOfActivity,
    duration,
    energyBurn,
    distance,
    description,
  } = req.body;

  const updateActivity = await Activity.findOneAndUpdate(
    {
      _id: id,
    },
    {
      typeOfActivity,
      title,
      dateOfActivity,
      duration,
      energyBurn,
      distance,
      description,
    },
    { new: true }
  );

  if (!updateActivity) {
    return res.status(404).json({ message: "Activity not found" });
  }

  res.status(200).json({ message: "Activity updated success" });
});

const deleteActivities = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deleteActivity = await Activity.findByIdAndDelete({ _id: id });

    if (!deleteActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.status(200).json({ message: "Activity deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export { createActivity, getAllActivities, updateActivities, deleteActivities };
