import React from "react";
import Delivery from "../models/Delivery";

export const getBadge = (rating) => {
  if (rating >= 4.8) return "Campus Legend";
  if (rating >= 4.5) return "Elite";
  if (rating >= 4.0) return "Trusted";
  if (rating >= 3.5) return "Reliable";

  return "Beginner";
};
