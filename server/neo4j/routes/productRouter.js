import { Router } from "express";
import neo4j from "../connection.js";
import { NotFoundError } from "../../common/NotFoundError.js";

const router = Router();

/**
 * @swagger
 * /neo4j/products:
 *   get:
 *     tags:
 *       [Neo4j - Products]
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
 *                        $ref: '#/components/schemas/Neo4jProduct'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/products", async (req, res, next) => {
  try {
    const products = await neo4j.all("Product");
    res.status(200).json({
      data: {
        products: products.map((product) => product.properties()),
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /neo4j/products:
 *   post:
 *     tags:
 *       [Neo4j - Products]
 *     summary: Create a product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Neo4jProductInput'
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
 *                       $ref: '#/components/schemas/Neo4jProduct'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post("/products", async (req, res, next) => {
  try {
    const { name, description, quantityInStock, price } = req.body;
    const product = await neo4j.create("Product", {
      name,
      description,
      quantityInStock,
      price,
    });
    res.status(201).json({
      data: {
        product: product.properties(),
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /neo4j/products/{productId}:
 *   get:
 *     tags:
 *       [Neo4j - Products]
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
 *                       $ref: '#/components/schemas/Neo4jProduct'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/products/:productId", async (req, res, next) => {
  try {
    const product = await neo4j.find("Product", req.params.productId);
    if (!product) {
      throw new NotFoundError();
    }
    res.status(200).json({
      data: {
        product: product.properties(),
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /neo4j/products/{productId}:
 *   delete:
 *     tags:
 *       [Neo4j - Products]
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
 *                       $ref: '#/components/schemas/Neo4jProduct'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete("/products/:productId", async (req, res, next) => {
  try {
    const product = await neo4j.find("Product", req.params.productId);
    if (!product) {
      throw new NotFoundError();
    }

    await product.delete();

    res.status(200).json({
      data: {
        product: product.properties(),
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /neo4j/products/{productId}:
 *   patch:
 *     tags:
 *       [Neo4j - Products]
 *     summary: Update a product by ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Neo4jProductInput'
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
 *                       $ref: '#/components/schemas/Neo4jProduct'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.patch("/products/:productId", async (req, res, next) => {
  try {
    const { name, description, quantityInStock, price } = req.body;
    const productToUpdate = await neo4j.find("Product", req.params.productId);

    const updatedProduct = {
      ...productToUpdate.properties(),
      name,
      description,
      quantityInStock,
      price,
    };

    const product = await productToUpdate.update(updatedProduct);

    res.status(200).json({
      data: {
        product: product.properties(),
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
