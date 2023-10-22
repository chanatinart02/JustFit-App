import express from "express";
import {
  createActivity,
  getAllActivities,
  updateActivities,
  deleteActivities,
} from "../controllers/activity.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createActivity);
router.get("/:id", verifyToken, getAllActivities);
router.patch("/:id", verifyToken, updateActivities);
router.delete("/:id", verifyToken, deleteActivities);

export default router;
