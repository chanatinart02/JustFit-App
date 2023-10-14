import asyncHandler from "express-async-handler";
import Activity from "../models/activity.model.js";

const createActivity = asyncHandler(async (req, res) => {
  res.status(200).send("create");
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
