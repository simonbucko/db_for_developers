import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequalize = new Sequelize(
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
