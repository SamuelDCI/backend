import { Router } from "express";

const router = Router();

import {
  getAllOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrdersByUserId,
} from "../controllers/orderControllers.js";
import { auth } from "../middleware/authorization.js";
import { isAdmin } from "../middleware/isAdmin.js";

// "/api/orders"
router.get("/allorders", getAllOrders); //read
router.get("/singleorder/:id", getSingleOrder); //read sindle order
router.get("/getOrdersByUserId/:id", getOrdersByUserId); //read single order by the user ID
router.post("/neworder", auth, isAdmin, createOrder); // create
router.patch("/update/:id", auth, updateOrder); // update
router.delete("/delete/:id", auth, deleteOrder); //delete

export default router;
