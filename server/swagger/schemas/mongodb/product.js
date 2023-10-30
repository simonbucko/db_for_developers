export const MongodbProduct = {
  type: "object",
  properties: {
    _id: {
      type: "string",
    },
    name: {
      type: "string",
    },
    description: {
      type: "string",
    },
    price: {
      type: "number",
    },
    quantityInStock: {
      type: "number",
    },
    __v: {
      type: "number",
    },
  },
};

export const MongodbProductInput = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    description: {
      type: "string",
    },
    price: {
      type: "number",
    },
    quantityInStock: {
      type: "number",
    },
  },
};
