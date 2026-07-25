import express from "express";
import { createUser } from "../controllers/userController.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("User route is working!");
});
router.post("/", createUser);

export default router;
