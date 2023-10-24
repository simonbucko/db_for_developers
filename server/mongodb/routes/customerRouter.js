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

router.get("/customers/:customerId", async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.customerId);

    if (customer == null) {
      throw new NotFoundError();
    }

    res.status(200).json({
      data: {
        customer,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/customers/:customerId", async (req, res, next) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.customerId);

    res.status(200).json({
      data: {
        customer,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/customers/:customerId", async (req, res, next) => {
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

    const savedCustomer = await Customer.findById(req.params.customerId).lean();

    const updatedCustomer = {
      ...savedCustomer,
      firstName,
      lastName,
      phone,
      email,
      address: {
        state: state || savedCustomer.address.state,
        postalCode: postalCode || savedCustomer.address.postalCode,
        city: city || savedCustomer.address.city,
        street: street || savedCustomer.address.street,
      },
    };

    const customer = await Customer.findByIdAndUpdate(
      req.params.customerId,
      updatedCustomer,
      { new: true }
    );

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
