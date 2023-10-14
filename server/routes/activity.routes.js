import express from "express";
import {
  createActivity,
  getAllActivities,
  updateActivities,
  deleteActivities,
} from "../controllers/activity.controller.js";

const router = express.Router();

router.route("/").get(getAllActivities);
router.route("/").post(createActivity);
router.route("/:id").delete(deleteActivities);
router.route("/:id").patch(updateActivities);

export default router;
