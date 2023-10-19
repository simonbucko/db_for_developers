import { Router, raw } from "express";
import models from "../models/init-models.js";
import { NotFoundError } from "../../common/NotFoundError.js";

const router = Router();

router.get("/customers", async (req, res, next) => {
  try {
    const customers = await models.customer.findAll({
      include: "address",
    });

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

    const address = await models.address.create({
      state,
      postalCode,
      city,
      street,
    });

    const customer = await models.customer.create({
      firstName,
      lastName,
      phone,
      email,
      addressId: address.id,
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
    const customer = await models.customer.findOne({
      where: {
        id: req.params.customerId,
      },
      include: "address",
    });

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
    const customer = await models.customer.destroy({
      where: {
        id: req.params.customerId,
      },
    });

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

router.patch("/customers/:customerId", async (req, res, next) => {
  try {
    const { firstName, lastName, phone, email } = req.body;

    const savedCustomer = await models.customer.findOne({
      where: {
        id: req.params.customerId,
      },
    });

    if (savedCustomer == null) {
      throw new NotFoundError();
    }

    const updatedCustomer = {
      ...savedCustomer,
      firstName,
      lastName,
      phone,
      email,
    };

    const customer = await savedCustomer.update(updatedCustomer);

    res.status(200).json({
      data: {
        customer,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/customers/:customerId/address", async (req, res, next) => {
  try {
    const { state, postalCode, city, street } = req.body;

    const customer = await models.customer.findOne({
      where: {
        id: req.params.customerId,
      },
      include: "address",
      raw: true,
    });

    if (customer == null) {
      throw new NotFoundError();
    }

    const updatedAddress = {
      ...customer.address,
      state,
      postalCode,
      city,
      street,
    };

    await models.address.update(updatedAddress, {
      where: {
        id: customer.address.id,
      },
    });

    res.status(200).json({
      data: {
        customer: {
          ...customer,
          address: {
            ...updatedAddress,
          },
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
