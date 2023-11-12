import { Router } from "express";
import productRouter from "./productRouter.js";
import orderRouter from "./orderRouter.js";

const router = Router();

router.use("/", orderRouter);
router.use("/", productRouter);

export default router;
