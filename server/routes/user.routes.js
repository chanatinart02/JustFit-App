import express from "express";
import {
  createUser,
  getUserInfoByID,
  editUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/").post(createUser);
router.route("/:id").get(getUserInfoByID);
router.route("/:id").patch(editUser);

export default router;
