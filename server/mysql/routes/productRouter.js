import { Router } from "express";
import models from "../models/init-models.js";
import { NotFoundError } from "../../common/NotFoundError.js";
import { Op } from "sequelize";

const router = Router();

/**
 * @swagger
 * /mysql/products:
 *   get:
 *     tags:
 *       [Mysql - Products]
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
 *         description: The field and direction to order by (format: field:direction)
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
 *                        $ref: '#/components/schemas/MysqlProduct'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/products", async (req, res, next) => {
  try {
    const { name, order, limit, page } = req.query;

    let orderClause = [];
    if (order) {
      const orderParams = order.split(":");
      orderClause = [[orderParams[0], orderParams[1].toUpperCase()]];
    }

    const products = await models.product.findAll({
      where: name ? { name: { [Op.like]: `%${name}%` } } : undefined,
      order: orderClause.length ? orderClause : undefined,
      limit: limit ? parseInt(limit) : undefined,
      offset:
        page && limit ? (parseInt(page) - 1) * parseInt(limit) : undefined,
    });

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
 * /mysql/products:
 *   post:
 *     tags:
 *       [Mysql - Products]
 *     summary: Create a products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MysqlProductInput'
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
 *                        $ref: '#/components/schemas/MysqlProduct'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post("/products", async (req, res, next) => {
  try {
    const { name, description, quantityInStock, price } = req.body;

    const product = await models.product.create({
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
 * /mysql/products/{productId}:
 *   get:
 *     tags:
 *       [Mysql - Products]
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
 *                        $ref: '#/components/schemas/MysqlProduct'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/products/:productId", async (req, res, next) => {
  try {
    const product = await models.product.findOne({
      where: {
        id: req.params.productId,
      },
    });

    if (product == null) {
      throw new NotFoundError();
    }

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
 * /mysql/products/{productId}:
 *   delete:
 *     tags:
 *       [Mysql - Products]
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
 *                        $ref: '#/components/schemas/MysqlProduct'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete("/products/:productId", async (req, res, next) => {
  try {
    const product = await models.product.destroy({
      where: {
        id: req.params.productId,
      },
    });

    if (product == null) {
      throw new NotFoundError();
    }

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
 * /mysql/products/{productId}:
 *   patch:
 *     tags:
 *       [Mysql - Products]
 *     summary: Update a product by ID
 *     parameters:
 *       - name: productId
 *         in: path
 *         description: ID of the product to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MysqlProductInput'
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
 *                        $ref: '#/components/schemas/MysqlProduct'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.patch("/products/:productId", async (req, res, next) => {
  try {
    const { name, description, quantityInStock, price } = req.body;

    const savedProduct = await models.product.findOne({
      where: {
        id: req.params.productId,
      },
    });

    if (savedProduct == null) {
      throw new NotFoundError();
    }

    const updatedProduct = {
      ...savedProduct,
      name,
      description,
      quantityInStock,
      price,
    };

    const product = await savedProduct.update(updatedProduct);

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
