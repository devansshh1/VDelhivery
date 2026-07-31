import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import userRoutes from "./routes/userRoutes.js";
<<<<<<< HEAD
=======
import deliveryRoutes from "./routes/deliveryRoutes.js";

>>>>>>> main
console.log("✅ userRoutes imported:", userRoutes);

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
<<<<<<< HEAD
=======
app.use("/api/delivery", deliveryRoutes);

>>>>>>> main
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Hello from Backend!",
  });
});
app.use("/api/users", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
