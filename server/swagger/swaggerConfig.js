import {
  MongodbProduct,
  MongodbProductInput,
  MongodbOrder,
  MongodbOrderInput,
  MongodbCustomer,
  MongodbCustomerInput,
  MysqlBigCustomer,
  MysqlOrder,
  MysqlOrderInput,
  MysqlCustomer,
  MysqlCustomerInput,
  MysqlCustomerUpdate,
  MysqlCustomerAddressUpdate,
} from "./schemas/index.js";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "eshop API",
    version: "1.0.0",
    description: "This is the documentation for the eshop API",
  },
  components: {
    responses: {
      NotFound: {},
      InternalServerError: {},
    },
    schemas: {
      MongodbProduct,
      MongodbProductInput,
      MongodbOrder,
      MongodbOrderInput,
      MongodbCustomer,
      MongodbCustomerInput,
      MysqlBigCustomer,
      MysqlCustomer,
      MysqlOrder,
      MysqlOrderInput,
      MysqlCustomerInput,
      MysqlCustomerUpdate,
      MysqlCustomerAddressUpdate,
    },
  },
};

export const options = {
  swaggerDefinition,
  apis: ["./**/*Router.js"],
};
