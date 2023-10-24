import { Router } from "express";
import Order from "../models/order.js";
import mongoose from "mongoose";

const router = Router();

router.get("/orders", async (req, res, next) => {
  try {
    const orders = await Order.find({});
    res.status(200).json({
      data: {
        orders,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/orders", async (req, res, next) => {
  try {
    const { customerId, products } = req.body;
    const totalPrice = products
      .reduce((accumulator, product) => {
        return accumulator + product.price * product.quantity;
      }, 0)
      .toFixed(2);

    const customerObjectId = mongoose.Types.ObjectId(customerId);

    const order = await Order.create({
      orderDate: new Date(),
      customerId: customerObjectId,
      products,
      totalPrice,
    });

    // TODO: finish create order
    // reduce the stock of the products
    // create payment

    res.status(200).json({
      data: {
        orders,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
