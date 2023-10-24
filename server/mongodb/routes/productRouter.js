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

export default router;
