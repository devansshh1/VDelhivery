import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    hostelBlock: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 5,
    },
    totalDeliveries: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
