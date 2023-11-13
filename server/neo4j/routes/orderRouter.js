import { Router } from "express";
import neo4j from "../connection.js";
import { NotFoundError } from "../../common/NotFoundError.js";

const router = Router();

router.get("/orders", async (req, res, next) => {
  try {
    const orders = await neo4j.all("Order");
    res.status(200).json({
      data: {
        orders: orders.map((product) => product.properties()),
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/orders", async (req, res, next) => {
  try {
    const { customerId, products } = req.body;
    const totalPrice = products
      .reduce((accumulator, product) => {
        return accumulator + product.price * product.quantity;
      }, 0)
      .toFixed(2);
    const currentDate = new Date();

    // TODO: finih this and the whole router after other entities are created
    // const order = await neo4j.create("Order", {
    //   orderDate: currentDate,
    //   status: "processing",
    // });

    // await Promise.all(
    //   products.map(async (item) => {
    //     const product = await neo4j.find("Product", item.id);

    //     await neo4j.createRelationship(order, "CONTAINS", product, "Product", {
    //       quantity: item.quantity,
    //     });

    //     await product.update({
    //       quantityInStock: product.properties().quantityInStock - item.quantity,
    //     });
    //   })
    // );

    // const payment = await neo4j.create("Payment", {
    //   paymentDate: currentDate,
    //   amount: totalPrice,
    // });

    // const customer = await neo4j.find("Customer", customerId);

    // await neo4j.createRelationship(customer, "PERFORMED", payment, "Payment");
    // await neo4j.createRelationship(payment, "PAID_FOR", order, "Order");
    // await neo4j.createRelationship(customer, "PLACED", order, "Order");

    try {
      const session = neo4j.session();
      const transaction = session.beginTransaction();

      const order = await transaction.run(
        `CREATE (o:Order {orderDate: $orderDate, status: $status}) RETURN o`,
        { orderDate: currentDate, status: "processing" }
      );

      await Promise.all(
        products.map(async (item) => {
          await transaction.run(
            `MATCH (o:Order), (p:Product) 
             WHERE o.id = $orderId AND p.id = $productId 
             CREATE (o)-[r:CONTAINS {quantity: $quantity}]->(p)`,
            {
              orderId: order.records[0].get("o").properties.id,
              productId: item.id,
              quantity: item.quantity,
            }
          );

          await transaction.run(
            `MATCH (p:Product {id: $id}) 
             SET p.quantityInStock = p.quantityInStock - $quantity`,
            { id: item.id, quantity: item.quantity }
          );
        })
      );

      const payment = await transaction.run(
        `CREATE (p:Payment {paymentDate: $paymentDate, amount: $amount}) RETURN p`,
        { paymentDate: currentDate, amount: totalPrice }
      );

      await transaction.run(
        `MATCH (c:Customer), (p:Payment) 
         WHERE c.id = $customerId AND p.id = $paymentId 
         CREATE (c)-[:PERFORMED]->(p)`,
        {
          customerId: customerId,
          paymentId: payment.records[0].get("p").properties.id,
        }
      );

      await transaction.run(
        `MATCH (p:Payment), (o:Order) 
         WHERE p.id = $paymentId AND o.id = $orderId 
         CREATE (p)-[:PAID_FOR]->(o)`,
        {
          paymentId: payment.records[0].get("p").properties.id,
          orderId: order.records[0].get("o").properties.id,
        }
      );

      await transaction.run(
        `MATCH (c:Customer), (o:Order) 
         WHERE c.id = $customerId AND o.id = $orderId 
         CREATE (c)-[:PLACED]->(o)`,
        {
          customerId: customerId,
          orderId: order.records[0].get("o").properties.id,
        }
      );

      await transaction.commit();

      res.status(201).json({
        data: {
          order: order.properties(),
        },
      });
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    } finally {
      session.close();
    }
  } catch (error) {
    next(error);
  }
});

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

export default router;
