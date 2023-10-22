import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequalize = new Sequelize(
  process.env.MYSQL_SCHEMA_NAME,
  process.env.MYSQL_USER_NAME,
  process.env.MYSQL_USER_PASSWORD,
  {
    host: process.env.MYSQL_CONNECTION_STRING,
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
