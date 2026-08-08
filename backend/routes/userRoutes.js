import express from "express";
import {
  createUser,
  getUserProfile,
  deleteUserAccount,
} from "../controllers/userController.js";

const router = express.Router();

// Test Route
router.get("/", (req, res) => {
  res.send("User route is working!");
});


// Create User
router.post("/", createUser);

// Get User Profile

router.get("/:clerkId/profile", getUserProfile);

//Delete user profile
router.delete("/:clerkId/delete", deleteUserAccount);

export default router;
