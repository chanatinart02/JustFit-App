import express from "express";
import {
  createUser,
  getUserInfoByID,
  updatesUser,
} from "../controllers/user.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createUser);
router.get("/:id", verifyToken, getUserInfoByID);
router.patch("/:id", verifyToken, updatesUser);

export default router;
