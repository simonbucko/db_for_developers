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
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: The name to filter by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: "The field and direction to order by (format: field\\:direction)"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of records to return
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number. Page size is specified in the limit parameter and page count starts from 1
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
    const { name, order, limit, page } = req.query;

    let sortOrder = {};
    if (order) {
      const orderParams = order.split(":");
      sortOrder[orderParams[0]] =
        orderParams[1].toLowerCase() === "desc" ? -1 : 1;
    }

    const query = name ? { name: new RegExp(name, "i") } : {};

    const products = await Product.find(query)
      .sort(sortOrder)
      .limit(limit ? parseInt(limit) : undefined)
      .skip(page && limit ? (parseInt(page) - 1) * parseInt(limit) : undefined);

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
