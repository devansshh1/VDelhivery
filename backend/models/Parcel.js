import mongoose from "mongoose";

const parcelSchema = new mongoose.Schema(
  {
    // Sender Details
    senderClerkId: {
      type: String,
      required: true,
    },

    senderName: {
      type: String,
      required: true,
    },

    senderRegistrationNumber: {
      type: String,
      required: true,
    },

    // Receiver Details
    receiverName: {
      type: String,
      required: true,
    },

    receiverRegistrationNumber: {
      type: String,
      required: true,
    },

    receiverHostelBlock: {
      type: String,
      required: true,
    },

    // Parcel Details
    courierCompany: {
      type: String,
      enum: ["Amazon", "Flipkart", "Myntra", "Meesho", "Ajio", "Other"],
      required: true,
    },

    parcelSize: {
      type: String,
      enum: ["Small", "Medium", "Large"],
      required: true,
    },

    // Delivery Details
    deliveryFee: {
      type: Number,
      required: true,
    },

    preferredDeliveryTime: {
      type: Date,
      required: true,
    },

    additionalInstructions: {
      type: String,
      default: "",
    },

    // Parcel Status
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Picked Up", "Delivered", "Cancelled"],
      default: "Pending",
    },

    // Delivery Partner
    deliveryPartnerClerkId: {
      type: String,
      default: null,
    },

    deliveryPartnerName: {
      type: String,
      default: "",
    },

    // Future Features
    otp: {
      type: String,
      default: "",
    },

    otpVerified: {
      type: Boolean,
      default: false,
    },

    isRated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Parcel = mongoose.model("Parcel", parcelSchema);

export default Parcel;
