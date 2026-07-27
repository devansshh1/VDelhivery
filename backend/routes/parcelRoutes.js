import express from "express";

import {
  createParcel,
  getPendingParcels,
  getMyParcels,
  acceptParcel,
  markDelivered,
} from "../controllers/parcelController.js";

const router = express.Router();

// Create Parcel Request
router.post("/", createParcel);

// Get All Pending Parcels
router.get("/pending", getPendingParcels);

// Get My Parcels
router.get("/my/:clerkId", getMyParcels);

// Accept Parcel
router.put("/accept/:id", acceptParcel);

// Mark Parcel as Delivered
router.put("/deliver/:id", markDelivered);

export default router;
