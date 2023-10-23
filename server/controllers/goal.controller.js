import asyncHandler from "express-async-handler";
import Goal from "../models/goal.model.js";
import User from "../models/user.model.js";

const createGoal = asyncHandler(async (req, res) => {
  const { typeOfActivity, deadline, duration, energyBurn, distance, email } =
    req.body;

  const user = await User.findOne({ email });
  if (!user) throw new Error("User not fond");

  const newGoal = await Goal.create({
    userId: user._id,
    typeOfActivity,
    deadline,
    duration,
    energyBurn,
    distance,
  });

  try {
    const saveGoal = await newGoal.save();
    res.status(201).json(saveGoal);
  } catch (error) {
    console.error(error);
  }
});

const getGoals = asyncHandler(async (req, res) => {
  res.status(200).send("Get goals");
});

const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).send("Delete goal");
});

export { createGoal, getGoals, deleteGoal };
