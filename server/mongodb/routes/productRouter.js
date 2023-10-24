import { Router } from "express";
import Product from "../models/product.js";

const router = Router();

router.get("/products", async (req, res, next) => {
  try {
    const products = await Product.find({});
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

    const product = await Product.create({
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
    const product = await Product.findById(req.params.productId);

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
    const product = await Product.findByIdAndDelete(req.params.productId);

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
