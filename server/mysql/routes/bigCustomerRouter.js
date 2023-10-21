import { Router } from "express";
import { sequalize } from "../connection.js";

const router = Router();

router.get("/big-customers", async (req, res, next) => {
  try {
    const [bigCustomers] = await sequalize.query(
      "SELECT * FROM bigcustomerview"
    );

    res.status(200).json({
      data: {
        bigCustomers,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
