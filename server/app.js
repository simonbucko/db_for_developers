import express from "express";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const sequalize = new Sequelize(
  process.env.DB_SCHEMA_NAME,
  process.env.DB_USER_NAME,
  process.env.DB_USER_PASSWORD,
  {
    host: process.env.DB_CONNECTION_STRING,
    dialect: "mysql",
    logging: console.log,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
  }
);
const SERVER_PORT = process.env.SERVER_PORT || 8080;

const app = express();

app.listen(SERVER_PORT, async () => {
  try {
    await sequalize.authenticate();
    console.log("Successfully connected to DB");
    console.log(`Server is running on port: ${SERVER_PORT}`);
  } catch (error) {
    console.log(error);
  }
});
