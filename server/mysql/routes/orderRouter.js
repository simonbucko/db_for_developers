import { Router, raw } from "express";
import models from "../models/init-models.js";
import { NotFoundError } from "../../common/NotFoundError.js";

const router = Router();

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
