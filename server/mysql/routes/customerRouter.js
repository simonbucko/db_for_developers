import { Router } from "express";
import models from "../models/init-models.js";
import address from "../models/init-models.js";

const router = Router();

router.get("/customers", async (req, res) => {
  const customers = await models.customer.findAll({
    raw: true,
    include: "address",
    nest: true,
  });

  res.status(200).json({
    data: {
      customers,
    },
  });
});

export default router;
