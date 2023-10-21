import { Router } from "express";
import customerRouter from "./customerRouter.js";
import productRouter from "./productRouter.js";
import orderRouter from "./orderRouter.js";

const router = Router();

router.use("/", customerRouter);
router.use("/", productRouter);
router.use("/", orderRouter);

export default router;
