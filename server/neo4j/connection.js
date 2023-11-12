import Neode from "neode";
import dotenv from "dotenv";
import {
  Product,
  Employee,
  Job,
  Order,
  Address,
  Office,
  Customer,
  Payment,
} from "./models/index.js";

dotenv.config();

const neode = new Neode(
  process.env.NEO4J_CONNECTION_STRING,
  process.env.NEO4J_USER,
  process.env.NEO4J_USER_PASSWORD,
  true
);

export default neode.with({
  Product,
  Employee,
  Job,
  Order,
  Address,
  Office,
  Customer,
  Payment,
});
