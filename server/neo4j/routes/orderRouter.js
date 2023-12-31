import { Router } from "express";
import neo4j from "../connection.js";
import { NotFoundError } from "../../common/NotFoundError.js";

const router = Router();

/**
 * @swagger
 * /neo4j/orders:
 *   get:
 *     tags:
 *       [Neo4j - Orders]
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
 *                        $ref: '#/components/schemas/Neo4jOrder'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/orders", async (req, res, next) => {
  try {
    const orders = await neo4j.all("Order");
    res.status(200).json({
      data: {
        orders: orders.map((product) => product.properties()),
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /neo4j/orders:
 *   post:
 *     tags:
 *       [Neo4j - Orders]
 *     summary: Create an order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Neo4jOrderInput'
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
 *                        $ref: '#/components/schemas/Neo4jOrder'
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
    const currentDate = new Date();

    const order = await neo4j.create("Order", {
      orderDate: currentDate,
      status: "processing",
    });

    await Promise.all(
      products.map(async (item) => {
        const product = await neo4j.find("Product", item.id);

        order.relateTo(product, "products", {
          quantity: item.quantity,
        });

        await product.update({
          quantityInStock: product.properties().quantityInStock - item.quantity,
        });
      })
    );

    const payment = await neo4j.create("Payment", {
      paymentDate: currentDate,
      amount: totalPrice,
    });

    const customer = await neo4j.find("Customer", customerId);

    await customer.relateTo(payment, "payments");
    await payment.relateTo(order, "order");
    await customer.relateTo(order, "orders");

    res.status(201).json({
      data: {
        order: order.properties(),
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /neo4j/orders/{orderId}:
 *   get:
 *     tags:
 *       [Neo4j - Orders]
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
    const order = await neo4j.find("Order", req.params.orderId);
    if (!order) {
      throw new NotFoundError();
    }

    const customer = await order.get("customer");
    const products = await order.get("products");

    res.status(200).json({
      data: {
        order: {
          ...order.properties(),
          customer: customer._end.properties(),
          products: products._values.map((product) => ({
            id: product._end.properties().id,
            name: product._end.properties().name,
            description: product._end.properties().description,
            quantity: product.properties().quantity,
          })),
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
