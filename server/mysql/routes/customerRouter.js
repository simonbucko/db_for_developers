import { Router, raw } from "express";
import models from "../models/init-models.js";

const router = Router();

router.get("/customers", async (req, res) => {
  const customers = await models.customer.findAll({
    include: "address",
  });

  res.status(200).json({
    data: {
      customers,
    },
  });
});

router.post("/customers", async (req, res) => {
  const { firstName, lastName, phone, email, state, postalCode, city, street } =
    req.body;

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
});

router.get("/customers/:customerId", async (req, res) => {
  const customer = await models.customer.findOne({
    where: {
      id: req.params.customerId,
    },
    include: "address",
  });

  res.status(200).json({
    data: {
      customer,
    },
  });
});

router.delete("/customers/:customerId", async (req, res) => {
  const customer = await models.customer.destroy({
    where: {
      id: req.params.customerId,
    },
  });

  res.status(200).json({
    data: {
      customer,
    },
  });
});

router.patch("/customers/:customerId", async (req, res) => {
  const { firstName, lastName, phone, email } = req.body;

  const savedCustomer = await models.customer.findOne({
    where: {
      id: req.params.customerId,
    },
  });

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
});

router.patch("/customers/:customerId/address", async (req, res) => {
  const { state, postalCode, city, street } = req.body;

  const customer = await models.customer.findOne({
    where: {
      id: req.params.customerId,
    },
    include: "address",
    raw: true,
  });

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
});

export default router;
