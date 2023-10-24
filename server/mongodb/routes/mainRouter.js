import { Router } from "express";
import customerRouter from "./customerRouter.js";
import orderRouter from "./orderRouter.js";
import productRouter from "./productRouter.js";

const router = Router();

router.use("/", customerRouter);
router.use("/", orderRouter);
router.use("/", productRouter);

export default router;
