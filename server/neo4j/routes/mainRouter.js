import { Router } from "express";
import productRouter from "./productRouter.js";
import orderRouter from "./orderRouter.js";
import customerRouter from "./customerRouter.js";

const router = Router();

router.use("/", orderRouter);
router.use("/", productRouter);
router.use("/", customerRouter);

export default router;
