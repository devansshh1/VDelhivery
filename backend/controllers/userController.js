import User from "../models/User.js";

export const createUser = async (req, res) => {
  try {
    console.log("Incoming Data:", req.body);

    const user = await User.create(req.body);

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
