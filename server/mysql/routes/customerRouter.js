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

  const returnedJson = address.toJSON();

  console.log(returnedJson.id);

  await address.destroy();

  //   const customer = await address.createCustomer({
  //     firstName,
  //     lastName,
  //     phone,
  //     email,
  //   });

  //   const customer = await models.customer.create({
  //     firstName,
  //     lastName,
  //     phone,
  //     email,
  //     addressId: rawAddress.id,
  //   });

  res.status(200).json({
    data: {
      customer,
    },
  });
});

export default router;
