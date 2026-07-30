import Delivery from "../models/Delivery.js";
import deliveryCharge from "../utils/deliveryCharge.js";

export const createDelivery = async (req, res) => {
  try {
    const {
      ownerClerkId,
      ownerName,
      ownerRegistrationNumber,
      ownerHostelBlock,
      courierCompany,
      parcelSize,
      preferredDeliveryTime,
      additionalInstructions,
    } = req.body;

    const deliveryFee = deliveryCharge[ownerHostelBlock];
    if (deliveryFee === undefined) {
      return res.status(400).json({
        success: false,
        message: "Invalid hostel block",
      });
    }

    const newDelivery = new Delivery({
      ownerClerkId,
      ownerName,
      ownerRegistrationNumber,
      ownerHostelBlock,
      courierCompany,
      parcelSize,
      deliveryFee,
      preferredDeliveryTime,
      additionalInstructions,
    });

    await newDelivery.save();

    res.status(201).json({
      success: true,
      delivery: newDelivery,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
