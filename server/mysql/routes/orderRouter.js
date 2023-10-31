import { Router } from "express";
import { sequalize } from "../connection.js";
import _sequelize from "sequelize";
import models from "../models/init-models.js";
import { NotFoundError } from "../../common/NotFoundError.js";

const router = Router();

/**
 * @swagger
 * /mysql/orders:
 *   get:
 *     tags:
 *       [Mysql - Orders]
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
 *                        $ref: '#/components/schemas/MysqlOrder'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/orders", async (req, res, next) => {
  try {
    const orders = await models.order.findAll({
      include: [
        {
          model: models.orderstatus,
          as: "orderStatus",
          attributes: {
            exclude: ["id"],
          },
        },
      ],
      attributes: {
        exclude: ["orderStatusId"],
      },
    });

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
 * /mysql/orders:
 *   post:
 *     tags:
 *       [Mysql - Orders]
 *     summary: Create an order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MysqlOrderInput'
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
 *                     order:
 *                        $ref: '#/components/schemas/MysqlOrder'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post("/orders", async (req, res, next) => {
  try {
    const { customerId, products } = req.body;

    const productIds = products.map((product) => product.id);
    const productQuantities = products.map((product) => product.quantity);
    const totalPrice = products
      .reduce((accumulator, product) => {
        return accumulator + product.price * product.quantity;
      }, 0)
      .toFixed(2);

    await sequalize.query("CALL placeOrder(?, ?, ?, ?)", {
      replacements: [
        customerId,
        productIds.join(","),
        productQuantities.join(","),
        totalPrice,
      ],
      type: _sequelize.QueryTypes.SELECT,
    });

    res.status(200).json({
      data: {},
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /mysql/orders/{orderId}:
 *   get:
 *     tags:
 *       [Mysql - Orders]
 *     summary: Get an order by ID
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
 *                     order:
 *                        $ref: '#/components/schemas/MysqlOrder'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/orders/:orderId", async (req, res, next) => {
  try {
    const order = await models.order.findOne({
      where: {
        id: req.params.orderId,
      },
      include: [
        {
          model: models.product,
          as: "products",
          attributes: { exclude: ["quantityInStock"] },
          through: {
            model: models.orderitem,
            attributes: ["quantity"],
          },
        },
        {
          model: models.orderstatus,
          as: "orderStatus",
          attributes: {
            exclude: ["id"],
          },
        },
      ],
      attributes: {
        exclude: ["orderStatusId"],
      },
    });

    if (order == null) {
      throw new NotFoundError();
    }

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
 * /mysql/orders/{orderId}/mark-shipped:
 *   post:
 *     tags:
 *       [Mysql - Orders]
 *     summary: Mark an order as shipped by ID
 *     parameters:
 *       - name: orderId
 *         in: path
 *         description: ID of the order to mark as shipped
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
 *                     order:
 *                        $ref: '#/components/schemas/MysqlOrder'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post("/orders/:orderId/mark-shipped", async (req, res, next) => {
  try {
    const order = await models.order.findOne({
      where: {
        id: req.params.orderId,
      },
    });

    if (order == null) {
      throw new NotFoundError();
    }

    const currentDate = new Date();

    await order.update({
      shippedDate: currentDate,
    });

    const updatedOrder = await models.order.findOne({
      where: {
        id: req.params.orderId,
      },
      include: [
        {
          model: models.product,
          as: "products",
          attributes: { exclude: ["quantityInStock"] },
          through: {
            model: models.orderitem,
            attributes: ["quantity"],
          },
        },
        {
          model: models.orderstatus,
          as: "orderStatus",
          attributes: {
            exclude: ["id"],
          },
        },
      ],
      attributes: {
        exclude: ["orderStatusId"],
      },
    });

    res.status(200).json({
      data: {
        order: updatedOrder,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
