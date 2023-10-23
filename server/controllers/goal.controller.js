import asyncHandler from "express-async-handler";
import Goal from "../models/goal.model.js";
import User from "../models/user.model.js";

const createGoal = asyncHandler(async (req, res) => {
  res.status(200).send("create goal");
});

const getGoals = asyncHandler(async (req, res) => {
  res.status(200).send("Get goals");
});

const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).send("Delete goal");
});

export { createGoal, getGoals, deleteGoal };
