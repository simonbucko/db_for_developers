import { Router } from "express";
import models from "../models/init-models.js";

const router = Router();

router.get("/addresses", async (req, res) => {
  const addressess = await models.address.findAll({
    raw: true,
  });

  res.status(200).json({
    data: {
      addressess,
    },
  });
});

export default router;
