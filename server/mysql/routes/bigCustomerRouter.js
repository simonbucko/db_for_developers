import { Router } from "express";
import { sequalize } from "../connection.js";

const router = Router();

/**
 * @swagger
 * /mysql/big-customers:
 *   get:
 *     tags:
 *       [Mysql - Big Customers]
 *     summary: Get a big customers list
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     customers:
 *                      type: array
 *                      items:
 *                        $ref: '#/components/schemas/MysqlBigCustomer'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
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
