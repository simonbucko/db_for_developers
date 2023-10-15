import { Router } from "express";
import customersRouter from "./customerRouter.js";

const router = Router();

router.use("/", customersRouter);
router.get("/", async (req, res) => {
  res.status(200).send("Hello");
});

export default router;
