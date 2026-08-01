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

export const getSearchingDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find({
      status: "Searching",
    });
    res.status(200).json({
      success: true,
      deliveries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const acceptDelivery = async (req, res) => {
  try {
    const { deliveryId } = req.params;
    const { deliveryPartnerClerkId, deliveryPartnerName } = req.body;

    const delivery = await Delivery.findById(deliveryId);
    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: "Delivery not found",
      });
    }
    if (delivery.status !== "Searching") {
      return res.status(400).json({
        success: false,
        message: "Delivery already accepted",
      });
    }

    delivery.status = "Accepted";
    delivery.deliveryPartnerClerkId = deliveryPartnerClerkId;
    delivery.deliveryPartnerName = deliveryPartnerName;
    await delivery.save();
    res.json({
      success: true,
      delivery,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
