import express from "express";
import dotenv from "dotenv";
import { sequalize } from "./mysql/connection.js";
import initModels from "./mysql/models/init-models.js";
import { DataTypes } from "sequelize";

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 8080;

const app = express();

app.listen(SERVER_PORT, async () => {
  try {
    await sequalize.authenticate();

    console.log("Successfully connected to DB");
    const models = initModels(sequalize);

    // const orderStatuses = await models.orderstatus.findAll({ raw: true });

    const customer = await models.customer.findByPk(
      "a0c7e67b-6155-11ee-9667-7c1e520063bc",
      { raw: true, nest: true }
    );

    console.log(customer);

    // orderStatuses.forEach((orderStatus) => {
    //   console.log(orderStatus.toJSON());
    // });

    //use save() to save a entity in the db and it will only save stuff that has been changed

    // use raw in the find all to only return the data from table and no meta data

    // use createX() when you want to create a child when creating a parent table

    console.log(`Server is running on port: ${SERVER_PORT}`);
  } catch (error) {
    console.log(error);
  }
});
