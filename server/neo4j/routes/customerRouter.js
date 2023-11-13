import { Router } from "express";
import neo4j from "../connection.js";
import { NotFoundError } from "../../common/NotFoundError.js";

const router = Router();

router.get("/customers", async (req, res, next) => {
  try {
    const customers = await neo4j.all("Customer");
    res.status(200).json({
      data: {
        customers: customers.map((customer) => customer.properties()),
      },
    });
  } catch (error) {
    next(error);
  }
});

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

    const customer = await neo4j.create("Customer", {
      firstName,
      lastName,
      phone,
      email,
    });

    const address = await neo4j.create("Address", {
      state,
      postalCode,
      city,
      street,
    });

    await customer.relateTo(address, "address");

    res.status(201).json({
      data: {
        customer: {
          ...customer.properties(),
          address: address.properties(),
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/customers/:customerId", async (req, res, next) => {
  try {
    const customer = await neo4j.find("Customer", req.params.customerId);

    if (!customer) {
      throw new NotFoundError();
    }

    const address = await customer.get("address");
    const orders = await customer.get("orders");
    const payments = await customer.get("payments");

    const customerJson = {
      ...customer.properties(),
      address: address._end.properties(),
      orders: orders?.map((order) => order.properties()) || [],
      payments: payments?.map((payment) => payment.properties()) || [],
    };

    res.status(200).json({
      data: {
        customer: customerJson,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/customers/:customerId", async (req, res, next) => {
  try {
    const customer = await neo4j.find("Customer", req.params.customerId);
    if (!customer) {
      throw new NotFoundError();
    }

    await customer.delete();

    res.status(200).json({
      data: {
        customer: customer.properties(),
      },
    });
  } catch (error) {
    next(error);
  }
});

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
    const customerToUpdate = await neo4j.find(
      "Customer",
      req.params.customerId
    );

    if (!customerToUpdate) {
      throw new NotFoundError();
    }

    const addressToUpdate = await customerToUpdate.get("address");

    const updatedCustomer = {
      ...customerToUpdate.properties(),
      firstName: firstName || customerToUpdate.properties().firstName,
      lastName: lastName || customerToUpdate.properties().lastName,
      phone: phone || customerToUpdate.properties().phone,
      email: email || customerToUpdate.properties().email,
    };

    const updatedAddress = {
      ...addressToUpdate._end.properties(),
      state: state || addressToUpdate._end.properties().state,
      postalCode: postalCode || addressToUpdate._end.properties().postalCode,
      city: city || addressToUpdate._end.properties().city,
      street: street || addressToUpdate._end.properties().street,
    };

    const customer = await customerToUpdate.update(updatedCustomer);
    const address = await addressToUpdate._end.update(updatedAddress);

    res.status(200).json({
      data: {
        customer: {
          ...customer.properties(),
          address: address.properties(),
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
