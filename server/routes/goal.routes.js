import express from "express";
import {
  createGoal,
  getGoals,
  deleteGoal,
} from "../controllers/goal.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", createGoal);
router.get("/", getGoals);
router.delete("/", deleteGoal);

export default router;
