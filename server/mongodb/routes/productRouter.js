import { Router } from "express";
import Product from "../models/product.js";

const router = Router();

/**
 * @swagger
 * /mongodb/products:
 *   get:
 *     tags:
 *       [Mongodb - Products]
 *     summary: Get a products list
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
 *                     products:
 *                      type: array
 *                      items:
 *                        $ref: '#/components/schemas/MongodbProduct'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/products", async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      data: {
        products,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /mongodb/products:
 *   post:
 *     tags:
 *       [Mongodb - Products]
 *     summary: Create a product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MongodbProductInput'
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
 *                     product:
 *                       $ref: '#/components/schemas/MongodbProduct'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post("/products", async (req, res, next) => {
  try {
    const { name, description, quantityInStock, price } = req.body;

    const product = await Product.create({
      name,
      description,
      quantityInStock,
      price,
    });

    res.status(200).json({
      data: {
        product,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /mongodb/products/{productId}:
 *   get:
 *     tags:
 *       [Mongodb - Products]
 *     summary: Get a product by ID
 *     parameters:
 *       - name: productId
 *         in: path
 *         description: ID of the product to get
 *         required: true
 *         schema:
 *           type: string
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
 *                     product:
 *                       $ref: '#/components/schemas/MongodbProduct'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/products/:productId", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);

    res.status(200).json({
      data: {
        product,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /mongodb/products/{productId}:
 *   delete:
 *     tags:
 *       [Mongodb - Products]
 *     summary: Delete a product by ID
 *     parameters:
 *       - name: productId
 *         in: path
 *         description: ID of the product to delete
 *         required: true
 *         schema:
 *           type: string
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
 *                     product:
 *                       $ref: '#/components/schemas/MongodbProduct'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete("/products/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);

    res.status(200).json({
      data: {
        product,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
