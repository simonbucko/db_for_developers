import express from "express";
import dotenv from "dotenv";
import { sequalize } from "./mysql/connection.js";
import initModels from "./mysql/models/init-models.js";

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 8080;

const app = express();

app.listen(SERVER_PORT, async () => {
  try {
    await sequalize.authenticate();

    console.log("Successfully connected to DB");
    const models = initModels(sequalize);
    const orderStatuses = await models.orderstatus.findAll();

    console.log(`Server is running on port: ${SERVER_PORT}`);
  } catch (error) {
    console.log(error);
  }
});
