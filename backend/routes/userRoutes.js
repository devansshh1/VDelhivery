import express from "express";
<<<<<<< HEAD
import { createUser, getUserProfile } from "../controllers/userController.js";
=======
import {
  createUser,
  getUserProfile,
  deleteUser,
} from "../controllers/userController.js";
>>>>>>> main

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

<<<<<<< HEAD
=======
//Delete user profile
router.delete("/:clerkId", deleteUser);

>>>>>>> main
export default router;
