import { Router } from "express";
import neo4j from "../connection.js";
import { NotFoundError } from "../../common/NotFoundError.js";

const router = Router();

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

router.post("/orders", async (req, res, next) => {
  try {
    const { customerId, products } = req.body;
    const totalPrice = products
      .reduce((accumulator, product) => {
        return accumulator + product.price * product.quantity;
      }, 0)
      .toFixed(2);
    const currentDate = new Date();

    // TODO: finih this and the whole router after other entities are created
    // create order
    // create relationship between order and products and set quantity
    // create a paymert and make relationship to customer
    // create a relationship between customer and order
    // deduct a quantity from product

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
    const product = await neo4j.find("Product", req.params.productId);
    if (!product) {
      throw new NotFoundError();
    }

    await product.delete();

    res.status(200).json({
      data: {
        product: product.properties(),
      },
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/products/:productId", async (req, res, next) => {
  try {
    const { name, description, quantityInStock, price } = req.body;
    const productToUpdate = await neo4j.find("Product", req.params.productId);

    const updatedProduct = {
      ...productToUpdate.properties(),
      name,
      description,
      quantityInStock,
      price,
    };

    const product = await productToUpdate.update(updatedProduct);

    res.status(200).json({
      data: {
        product: product.properties(),
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
