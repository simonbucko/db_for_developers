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
  MysqlProduct,
  MysqlProductInput,
  Neo4jProduct,
  Neo4jProductInput,
  Neo4jOrder,
  Neo4jOrderInput,
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
      MysqlProduct,
      MysqlProductInput,
      MysqlCustomerInput,
      MysqlCustomerUpdate,
      MysqlCustomerAddressUpdate,
      Neo4jProduct,
      Neo4jProductInput,
      Neo4jOrder,
      Neo4jOrderInput,
    },
  },
};

export const options = {
  swaggerDefinition,
  apis: ["./**/*Router.js"],
};
