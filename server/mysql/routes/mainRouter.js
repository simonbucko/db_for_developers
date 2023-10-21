import { Router } from "express";
import customerRouter from "./customerRouter.js";
import productRouter from "./productRouter.js";
import orderRouter from "./orderRouter.js";
import bigCustomerRouter from "./bigCustomerRouter.js";

const router = Router();

router.use("/", customerRouter);
router.use("/", productRouter);
router.use("/", orderRouter);
router.use("/", bigCustomerRouter);

export default router;
