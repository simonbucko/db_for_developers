import { Router } from "express";
import models from "../models/init-models.js";
import { NotFoundError } from "../../common/NotFoundError.js";

const router = Router();

/**
 * @swagger
 * /mysql/customers:
 *   get:
 *     tags:
 *       [Mysql - Customers]
 *     summary: Get a customers list
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
 *                        $ref: '#/components/schemas/MysqlCustomer'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/customers", async (req, res, next) => {
  try {
    const customers = await models.customer.findAll({
      include: "address",
    });

    res.status(200).json({
      data: {
        customers,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /mysql/customers:
 *   post:
 *     tags:
 *       [Mysql - Customers]
 *     summary: Create a customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MysqlCustomerInput'
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
 *                        $ref: '#/components/schemas/MysqlCustomer'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post("/customers", async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      email,
      state,
      postalCode,
      city,
      street,
    } = req.body;

    const address = await models.address.create({
      state,
      postalCode,
      city,
      street,
    });

    const customer = await models.customer.create({
      firstName,
      lastName,
      phone,
      email,
      addressId: address.id,
    });

    res.status(200).json({
      data: {
        customer,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /mysql/customers/{customerId}:
 *   get:
 *     tags:
 *       [Mysql - Customers]
 *     summary: Get a customer by ID
 *     parameters:
 *       - name: customerId
 *         in: path
 *         description: ID of the customer to get
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
 *                     customer:
 *                        $ref: '#/components/schemas/MysqlCustomer'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/customers/:customerId", async (req, res, next) => {
  try {
    const customer = await models.customer.findOne({
      where: {
        id: req.params.customerId,
      },
      include: "address",
    });

    if (customer == null) {
      throw new NotFoundError();
    }

    res.status(200).json({
      data: {
        customer,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /mysql/customers/{customerId}:
 *   delete:
 *     tags:
 *       [Mysql - Customers]
 *     summary: Delete a customer by ID
 *     parameters:
 *       - name: customerId
 *         in: path
 *         description: ID of the customer to delete
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
 *                     customer:
 *                        $ref: '#/components/schemas/MysqlCustomer'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete("/customers/:customerId", async (req, res, next) => {
  try {
    const customer = await models.customer.destroy({
      where: {
        id: req.params.customerId,
      },
    });

    if (customer == null) {
      throw new NotFoundError();
    }

    res.status(200).json({
      data: {
        customer,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /mysql/customers/{customerId}:
 *   patch:
 *     tags:
 *       [Mysql - Customers]
 *     summary: Update a customer by ID
 *     parameters:
 *       - name: customerId
 *         in: path
 *         description: ID of the customer to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MysqlCustomerUpdate'
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
 *                     customer:
 *                        $ref: '#/components/schemas/MysqlCustomer'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.patch("/customers/:customerId", async (req, res, next) => {
  try {
    const { firstName, lastName, phone, email } = req.body;

    const savedCustomer = await models.customer.findOne({
      where: {
        id: req.params.customerId,
      },
    });

    if (savedCustomer == null) {
      throw new NotFoundError();
    }

    const updatedCustomer = {
      ...savedCustomer,
      firstName,
      lastName,
      phone,
      email,
    };

    const customer = await savedCustomer.update(updatedCustomer);

    res.status(200).json({
      data: {
        customer,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /mysql/customers/{customerId}/address:
 *   patch:
 *     tags:
 *       [Mysql - Customers]
 *     summary: Update a customer's address by customer's ID
 *     parameters:
 *       - name: customerId
 *         in: path
 *         description: ID of the customer to update the address
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MysqlCustomerAddressUpdate'
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
 *                     customer:
 *                        $ref: '#/components/schemas/MysqlCustomer'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.patch("/customers/:customerId/address", async (req, res, next) => {
  try {
    const { state, postalCode, city, street } = req.body;

    const customer = await models.customer.findOne({
      where: {
        id: req.params.customerId,
      },
      include: "address",
      raw: true,
    });

    if (customer == null) {
      throw new NotFoundError();
    }

    const updatedAddress = {
      ...customer.address,
      state,
      postalCode,
      city,
      street,
    };

    await models.address.update(updatedAddress, {
      where: {
        id: customer.address.id,
      },
    });

    res.status(200).json({
      data: {
        customer: {
          ...customer,
          address: {
            ...updatedAddress,
          },
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
