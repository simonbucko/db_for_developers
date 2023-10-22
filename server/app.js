import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import mysqlRouter from "./mysql/routes/mainRouter.js";
import mongodbRouter from "./mongodb/routes/mainRouter.js";
import { errorHandler } from "./middleware/errorHandlerMiddleware.js";

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 8080;

const app = express();
app.use(express.json());

await mongoose.connect(process.env.MONGO_CONNECTION_STRING);

app.use("/mysql", mysqlRouter);
app.use("/mongodb", mongodbRouter);

app.use(errorHandler);

app.listen(SERVER_PORT, async () => {
  console.log(`Server is running on port: ${SERVER_PORT}`);
});
