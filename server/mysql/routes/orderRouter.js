import { Router, raw } from "express";
import models from "../models/init-models.js";
import { NotFoundError } from "../../common/NotFoundError.js";

const router = Router();

router.get("/orders", async (req, res, next) => {
  try {
    const orders = await models.order.findAll({});

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
      ],
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

// router.delete("/products/:productId", async (req, res, next) => {
//   try {
//     const product = await models.product.destroy({
//       where: {
//         id: req.params.productId,
//       },
//     });

//     if (product == null) {
//       throw new NotFoundError();
//     }

//     res.status(200).json({
//       data: {
//         product,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// router.patch("/products/:productId", async (req, res, next) => {
//   try {
//     const { name, description, quantityInStock, price } = req.body;

//     const savedProduct = await models.product.findOne({
//       where: {
//         id: req.params.customerId,
//       },
//     });

//     if (product == null) {
//       throw new NotFoundError();
//     }

//     const updatedProduct = {
//       ...savedProduct,
//       name,
//       description,
//       quantityInStock,
//       price,
//     };

//     const product = await savedProduct.update(updatedProduct);

//     res.status(200).json({
//       data: {
//         product,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// });

export default router;
