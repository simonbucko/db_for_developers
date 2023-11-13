import { Router } from "express";
import Customer from "../models/customer.js";

const router = Router();

/**
 * @swagger
 * /mongodb/customers:
 *   get:
 *     tags:
 *       [Mongodb - Customers]
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
 *                        $ref: '#/components/schemas/MongodbCustomer'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/customers", async (req, res, next) => {
  try {
    const customers = await Customer.find({});
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
 * /mongodb/customers:
 *   post:
 *     tags:
 *       [Mongodb - Customers]
 *     summary: Create a customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MongodbCustomerInput'
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
 *                       $ref: '#/components/schemas/MongodbCustomer'
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

    const customer = await Customer.create({
      firstName,
      lastName,
      phone,
      email,
      address: {
        state,
        postalCode,
        city,
        street,
      },
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
 * /mongodb/customers/{customerId}:
 *   get:
 *     tags:
 *       [Mongodb - Customers]
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
 *                       $ref: '#/components/schemas/MongodbCustomer'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/customers/:customerId", async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.customerId);

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
 * /mongodb/customers/{customerId}:
 *   delete:
 *     tags:
 *       [Mongodb - Customers]
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
 *                       $ref: '#/components/schemas/MongodbCustomer'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete("/customers/:customerId", async (req, res, next) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.customerId);

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
 * /mongodb/customers/{customerId}:
 *   patch:
 *     tags:
 *       [Mongodb - Customers]
 *     summary: Create a customer
 *     parameters:
 *       - name: customerId
 *         in: path
 *         description: ID of the customer to udpate
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MongodbCustomerInput'
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
 *                       $ref: '#/components/schemas/MongodbCustomer'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.patch("/customers/:customerId", async (req, res, next) => {
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

    const savedCustomer = await Customer.findById(req.params.customerId).lean();

    const updatedCustomer = {
      ...savedCustomer,
      firstName: firstName || savedCustomer.firstName,
      lastName: lastName || savedCustomer.lastName,
      phone: phone || savedCustomer.phone,
      email: email || savedCustomer.email,
      address: {
        state: state || savedCustomer.address.state,
        postalCode: postalCode || savedCustomer.address.postalCode,
        city: city || savedCustomer.address.city,
        street: street || savedCustomer.address.street,
      },
    };

    const customer = await Customer.findByIdAndUpdate(
      req.params.customerId,
      updatedCustomer,
      { new: true }
    );

    res.status(200).json({
      data: {
        customer,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
