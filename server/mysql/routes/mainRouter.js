import { Router } from "express";
import customerRouter from "./customerRouter.js";
import addressRouter from "./addressRouter.js";

const router = Router();

router.use("/", customerRouter);
router.use("/", addressRouter);

export default router;
