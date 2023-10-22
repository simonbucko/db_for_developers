import { Router } from "express";
import Customer from "../models/customer.js";

const router = Router();

router.get("/customers", async (req, res, next) => {
  try {
    const customers = await Customer.find({});
    res.status(200).json({
      data: {
        customers,
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

    const customer = await Customer.create({
      firstName,
      lastName,
      phone,
      email,
      address: {
        state,
        postalCode,
        city,
        street,
      },
    });

    res.status(200).json({
      data: {
        customer,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
