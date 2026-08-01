import express from "express";
import {
  createUser,
  getUserProfile,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// Test Route
router.get("/", (req, res) => {
  res.send("User route is working!");
});

router.get("/hello", (req, res) => {
  res.send("Hello Route Working");
});

// Create User
router.post("/", createUser);

// Get User Profile

router.get("/:clerkId", getUserProfile);

//Delete user profile
router.delete("/:clerkId", deleteUser);

export default router;
