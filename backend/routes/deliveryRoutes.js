import express from "express";
import {
  createDelivery,
  getSearchingDeliveries,
  acceptDelivery,
} from "../controllers/deliveryCostController.js";

const router = express.Router();

router.post("/", createDelivery);

router.get("/searching", getSearchingDeliveries);

router.put("/:deliveryId/accept", acceptDelivery);
export default router;
