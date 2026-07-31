import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema(
  {
    // Student requesting the delivery
    ownerClerkId: {
      type: String,
      required: true,
    },

    ownerName: {
      type: String,
      required: true,
    },

    ownerRegistrationNumber: {
      type: String,
      required: true,
    },

    ownerHostelBlock: {
      type: String,
      required: true,
    },

    // Parcel Details
    courierCompany: {
      type: String,
      enum: ["Amazon", "Flipkart", "Myntra", "Meesho", "AJIO", "Other"],
      required: true,
    },

    parcelSize: {
      type: String,
      enum: ["Small", "Medium", "Large"],
      required: true,
    },

    deliveryFee: {
      type: Number,
      required: true,
    },

    preferredDeliveryTime: {
      type: Date,
    },

    additionalInstructions: {
      type: String,
      default: "",
    },

    // Delivery Status
    status: {
      type: String,
      enum: ["Searching", "Accepted", "Picked Up", "Completed"],
      default: "Searching",
    },

    // Delivery Partner (filled only after owner selects one)
    deliveryPartnerClerkId: {
      type: String,
      default: null,
    },

    deliveryPartnerName: {
      type: String,
      default: "",
    },

    // Interested Students (NEW)
    interestedStudents: [
      {
        clerkId: String,
        name: String,
        rating: Number,
        totalDeliveries: Number,
      },
    ],

    // OTP
    otp: {
      type: String,
      default: "",
    },

    otpVerified: {
      type: Boolean,
      default: false,
    },

    // Rating
    isRated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Delivery", deliverySchema);
