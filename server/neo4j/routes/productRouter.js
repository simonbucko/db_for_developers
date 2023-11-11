import { Router } from "express";
import neo4j from "../connection.js";

const router = Router();

router.get("/products", async (req, res, next) => {
  try {
    const products = await neo4j.all("Product");
    console.log(products._values);
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
    const product = await neo4j.create("Product", {
      name: "req.body.name",
      description: "req.body.description",
      quantityInStock: 23,
      price: 144.33,
    });
    res.status(200).json({
      data: {
        product: product.toJson(),
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
