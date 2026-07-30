import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    deliveryPartner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    pickupLocation: String,

    dropLocation: String,

    status: {
      type: String,
      enum: ["Pending", "Accepted", "Completed"],
      default: "Pending",
    },

    amount: Number,
  },
  { timestamps: true },
);

export default mongoose.model("Delivery", deliverySchema);
