import { Router, raw } from "express";
import models from "../models/init-models.js";
import { NotFoundError } from "../../common/NotFoundError.js";

const router = Router();

router.get("/products", async (req, res, next) => {
  try {
    const products = await models.product.findAll();

    res.status(200).json({
      data: {
        products,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/products", async (req, res, next) => {
  try {
    const { name, description, quantityInStock, price } = req.body;

    const product = await models.product.create({
      name,
      description,
      quantityInStock,
      price,
    });

    res.status(200).json({
      data: {
        product,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/products/:productId", async (req, res, next) => {
  try {
    const product = await models.product.findOne({
      where: {
        id: req.params.productId,
      },
    });

    if (product == null) {
      throw new NotFoundError();
    }

    res.status(200).json({
      data: {
        product,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/products/:productId", async (req, res, next) => {
  try {
    const product = await models.product.destroy({
      where: {
        id: req.params.productId,
      },
    });

    if (product == null) {
      throw new NotFoundError();
    }

    res.status(200).json({
      data: {
        product,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/products/:productId", async (req, res, next) => {
  try {
    const { name, description, quantityInStock, price } = req.body;

    const savedProduct = await models.product.findOne({
      where: {
        id: req.params.customerId,
      },
    });

    if (product == null) {
      throw new NotFoundError();
    }

    const updatedProduct = {
      ...savedProduct,
      name,
      description,
      quantityInStock,
      price,
    };

    const product = await savedProduct.update(updatedProduct);

    res.status(200).json({
      data: {
        product,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
