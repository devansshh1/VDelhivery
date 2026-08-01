import React from "react";
import Delivery from "../models/Delivery";
import { getBadge } from "../utils/badge.js";

import Delivery from "../models/Delivery.js";
import { getBadge } from "../utils/badge.js";
import deliveryCharge from "../utils/deliveryCharge.js";

const user = await User.findById(delivery.deliveryPartner);

user.totalDeliveries += 1;

user.earnings += delivery.amount;

user.rating = Math.min(5, user.rating + 0.1);
user.badge = getBadge(user.rating);

await user.save();
