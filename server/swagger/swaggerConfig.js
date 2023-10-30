import {
  MongodbProduct,
  MongodbProductInput,
  MongodbOrder,
  MongodbOrderInput,
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
    },
  },
};

export const options = {
  swaggerDefinition,
  apis: ["./**/*Router.js"],
};
