import User from "../models/User.js";

// Create User
export const createUser = async (req, res) => {
  try {
    console.log("Incoming Data:", req.body);

    const user = await User.create(req.body);

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

export const deleteUser = async (req, res) => {
  try {
    console.log("DELETE request received for:", req.params.clerkId);
    const { clerkId } = req.params;

    const deletedUser = await User.findOneAndDelete({ clerkId });

    console.log("Deleted User:", deletedUser);

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
