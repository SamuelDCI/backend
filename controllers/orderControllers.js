import OrderModel from "../models/orderSchema.js";
import User from "../models/usersSchema.js";
export const getAllOrders = async (req, res, next) => {
  try {
    const allOrders = await OrderModel.find().populate("records");
    // const allOrders = await OrderModel.find().populate("records", " title -_id") // This indicates not to show the id just the title in Records
    res.send(allOrders);
  } catch (err) {
    next(err);
  }
};

export const getSingleOrder = async (req, res, next) => {
  // "/api/orders/singleorder/343v24kh2v3h42jh52" get
  try {
    const singleOrder = await OrderModel.findById(req.params.id)
      .populate("records", "title") // To see the title in the recordsCollection
      .populate("useId", "-id -password -email"); //To extract certain info from the userCollection
    res.send(singleOrder);
  } catch (err) {
    next(err);
  }
};

// "/api/orders/getSingleOrderByUserId/343v24kh2v3h42jh52" get order by user ID
export const getOrdersByUserId = async (req, res, next) => {
  try {
    const singleOrderById = await OrderModel.find({ userId: req.params.id })
      .populate("records", "title")
      //   .populate({path: "records", select: {title: 1, _id: 0}})
      .populate("userId", "-_id -password -email");
    res.send(singleOrderById);
  } catch (err) {
    next(err);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const order = await OrderModel.create(req.body);
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $push: { orders: order._id } },
      { new: true }
    );
    res.send(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const updateOrder = async (req, res, next) => {
  // "/api/orders/singleorder/343v24kh2v3h42jh52" patch
  try {
    const updateOrder = await OrderModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.send(updateOrder);
  } catch (err) {
    next(err);
  }
};

export const deleteOrder = async (req, res, next) => {
  // "/api/orders/singleorder/343v24kh2v3h42jh52" delete
  try {
    const deleteOrder = await OrderModel.findByIdAndDelete(req.params.id);
    res.send(deleteOrder);
  } catch (err) {
    next(err);
  }
};
