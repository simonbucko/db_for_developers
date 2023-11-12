import { Router } from "express";
import neo4j from "../connection.js";
import { NotFoundError } from "../../common/NotFoundError.js";

const router = Router();

router.get("/customers", async (req, res, next) => {
  try {
    const customers = await neo4j.all("Customer");
    res.status(200).json({
      data: {
        customers: customers.map((customer) => customer.properties()),
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/customers", async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      email,
      state,
      postalCode,
      city,
      street,
    } = req.body;

    const customer = await neo4j.create("Customer", {
      firstName,
      lastName,
      phone,
      email,
    });

    const address = await neo4j.create("Address", {
      state,
      postalCode,
      city,
      street,
    });

    await customer.relateTo(address, "HAS_ADDRESS"); // TODO: check if this works

    res.status(201).json({
      data: {
        customer: customer.properties(),
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
