import Parcel from "../models/Parcel.js";

// Create a Parcel Request
export const createParcel = async (req, res) => {
  try {
    const parcel = await Parcel.create(req.body);

    res.status(201).json({
      success: true,
      data: parcel,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Pending Parcels
export const getPendingParcels = async (req, res) => {
  try {
    const parcels = await Parcel.find({
      status: "Pending",
    });

    res.status(200).json({
      success: true,
      data: parcels,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Parcels Created By a User
export const getMyParcels = async (req, res) => {
  try {
    const parcels = await Parcel.find({
      senderClerkId: req.params.clerkId,
    });

    res.status(200).json({
      success: true,
      data: parcels,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Accept a Parcel
export const acceptParcel = async (req, res) => {
  try {
    const parcel = await Parcel.findById(req.params.id);

    if (!parcel) {
      return res.status(404).json({
        success: false,
        message: "Parcel not found",
      });
    }

    parcel.status = "Accepted";
    parcel.deliveryPartnerClerkId = req.body.deliveryPartnerClerkId;
    parcel.deliveryPartnerName = req.body.deliveryPartnerName;

    await parcel.save();

    res.status(200).json({
      success: true,
      data: parcel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Mark Parcel as Delivered
export const markDelivered = async (req, res) => {
  try {
    const parcel = await Parcel.findById(req.params.id);

    if (!parcel) {
      return res.status(404).json({
        success: false,
        message: "Parcel not found",
      });
    }

    parcel.status = "Delivered";

    await parcel.save();

    res.status(200).json({
      success: true,
      data: parcel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
