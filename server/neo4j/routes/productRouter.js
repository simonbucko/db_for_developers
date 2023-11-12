import { Router } from "express";
import neo4j from "../connection.js";
import { NotFoundError } from "../../common/NotFoundError.js";

const router = Router();

router.get("/products", async (req, res, next) => {
  try {
    const products = await neo4j.all("Product");
    res.status(200).json({
      data: {
        products: products.map((product) => product.properties()),
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/products", async (req, res, next) => {
  try {
    const { name, description, quantityInStock, price } = req.body;
    const product = await neo4j.create("Product", {
      name,
      description,
      quantityInStock,
      price,
    });
    res.status(201).json({
      data: {
        product: product.properties(),
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/products/:productId", async (req, res, next) => {
  try {
    const product = await neo4j.find("Product", req.params.productId);
    if (!product) {
      throw new NotFoundError();
    }
    res.status(200).json({
      data: {
        product: product.properties(),
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/products/:productId", async (req, res, next) => {
  try {
    const product = await neo4j.delete("Product", { id: req.params.productId });
    if (!product) {
      throw new NotFoundError();
    }
    res.status(200).json({
      data: {},
    });
  } catch (error) {
    next(error);
  }
});

export default router;
