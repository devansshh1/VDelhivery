import User from "../models/User.js";
import Order from '../models/Delivery.js'

export const createUser = async (req, res) => {
  try {
    console.log("Incoming Data:", req.body);

    const user = await User.findOneAndUpdate(
      { clerkId: req.body.clerkId },
      req.body,
      {
        new: true,
        runValidators: true,
        setDefaultsOnInsert: true,
        upsert: true,
      },
    );

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    console.log("Searching for:", req.params.clerkId);

    const user = await User.findOne({
      clerkId: req.params.clerkId,
    });

    console.log("Found User:", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // res.status(200).json({
    //   success: true,
    //   data: user,
    // });
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteUserAccount = async (req, res) => {
  const { clerkId } = req.params;

  if (!clerkId) {
    return res.status(400).json({
      success: false,
      message: "Clerk ID is required.",
    });
  }

  try {
    const [deletedUser, deletedDeliveries, updatedDeliveries] = await Promise.all([
      User.findOneAndDelete({ clerkId }),
      Order.deleteMany({
        $or: [
          { ownerClerkId: clerkId },
          { deliveryPartnerClerkId: clerkId },
        ],
      }),
      Order.updateMany(
        { "interestedStudents.clerkId": clerkId },
        { $pull: { interestedStudents: { clerkId } } },
      ),
    ]);

    return res.status(200).json({
      success: true,
      message: "User app data deleted successfully.",
      deletedUser: Boolean(deletedUser),
      deletedDeliveries: deletedDeliveries.deletedCount,
      updatedDeliveries: updatedDeliveries.modifiedCount,
    });
  } catch (error) {
    console.error("Account data deletion failed:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete account data.",
    });
  }
};
