import express from "express";
import {
  createUser,
  getUserInfoByID,
  updatesUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/").post(createUser);
router.route("/:id").get(getUserInfoByID);
router.route("/:id").patch(updatesUser);

export default router;
