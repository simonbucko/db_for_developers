import { Router } from "express";
import Order from "../models/order.js";
import Payment from "../models/payment.js";
import Product from "../models/product.js";
import Customer from "../models/customer.js";
import mongoose from "mongoose";

const router = Router();

/**
 * @swagger
 * /mongodb/orders:
 *   get:
 *     tags:
 *       [Mongodb - Orders]
 *     summary: Get a orders list
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     orders:
 *                      type: array
 *                      items:
 *                        $ref: '#/components/schemas/MongodbOrder'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
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

/**
 * @swagger
 * /mongodb/orders:
 *   post:
 *     tags:
 *       [Mongodb - Orders]
 *     summary: Create an order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MongodbOrderInput'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     orders:
 *                      type: array
 *                      items:
 *                        $ref: '#/components/schemas/MongodbOrder'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post("/orders", async (req, res, next) => {
  try {
    const { customerId, products } = req.body;
    const totalPrice = products
      .reduce((accumulator, product) => {
        return accumulator + product.price * product.quantity;
      }, 0)
      .toFixed(2);
    const customerObjectId = new mongoose.Types.ObjectId(customerId);
    const currentDate = new Date();

    const order = await Order.create({
      orderDate: currentDate,
      customerId: customerObjectId,
      products,
      totalPrice,
    });

    await Promise.all(
      products.map(async (product) => {
        await Product.findOneAndUpdate(
          { _id: product.id },
          { $inc: { quantityInStock: -product.quantity } }
        );
      })
    );

    const payment = await Payment.create({
      paymentDate: currentDate,
      amount: totalPrice,
      orderId: order._id,
    });

    await Customer.findOneAndUpdate(
      { _id: customerId },
      { $push: { payments: payment._id, orders: order._id } }
    );

    res.status(200).json({
      data: {
        order,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /mongodb/orders/{orderId}:
 *   get:
 *     tags:
 *       [Mongodb - Orders]
 *     summary: Get an order
 *     parameters:
 *       - name: orderId
 *         in: path
 *         description: ID of the order to get
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     product:
 *                       $ref: '#/components/schemas/MongodbOrder'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/orders/:orderId", async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId);

    res.status(200).json({
      data: {
        order,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
