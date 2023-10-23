import express from "express";
import {
  createGoal,
  getGoals,
  deleteGoal,
  updateGoal,
} from "../controllers/goal.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createGoal);
router.get("/:id", verifyToken, getGoals);
router.put("/:id", verifyToken, updateGoal);
router.delete("/:id", verifyToken, deleteGoal);

export default router;
