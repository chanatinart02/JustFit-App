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
router.route("/").get(getAllActivities);
router.route("/:id").delete(deleteActivities);
router.route("/:id").patch(updateActivities);

export default router;
