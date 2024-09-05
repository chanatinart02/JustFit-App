import asyncHandler from "express-async-handler";
import Goal from "../models/goal.model.js";
import User from "../models/user.model.js";

const createGoal = asyncHandler(async (req, res) => {
  const { typeOfGoal, deadline, duration, energyBurn, distance, email } =
    req.body;

  const user = await User.findOne({ email });
  if (!user) throw new Error("User not fond");

  const newGoal = await Goal.create({
    userId: user._id,
    typeOfGoal,
    deadline,
    duration,
    energyBurn,
    distance,
    status: null,
  });

  try {
    const saveGoal = await newGoal.save();
    res.status(201).json(saveGoal);
  } catch (error) {
    console.error(error);
  }
});

const getGoals = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const goals = await Goal.find({ userId: id }).sort({ deadline: -1 });

  // Check deadlines and update status
  const now = new Date();
  for (const goal of goals) {
    if (goal.deadline < now && goal.status !== "success")
      try {
        goal.status = "failed";
        await goal.save();
      } catch (error) {
        console.error("Error updating goal status:", error);
      }
  }

  if (goals) {
    res.status(200).json(goals);
  } else {
    res.status(404).json({ message: "Goals not found" });
  }
});

const updateGoal = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const updateStatus = await Goal.findOneAndUpdate(
    {
      _id: id,
    },
    {
      status,
    },
    { new: true }
  );

  if (!updateStatus) {
    return res.status(404).json({ message: "Goal not found" });
  }
  res.status(200).json(updateStatus);
});

const deleteGoal = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deleteGoal = await Goal.findByIdAndDelete({ _id: id });

    if (!deleteGoal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    res.status(200).json({ message: "Goal deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export { createGoal, getGoals, deleteGoal, updateGoal };
