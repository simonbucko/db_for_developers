export const MysqlProduct = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
    name: {
      type: "string",
    },
    description: {
      type: "string",
    },
    quantityInStock: {
      type: "number",
    },
    price: {
      type: "string",
    },
  },
};

export const MysqlProductInput = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    description: {
      type: "string",
    },
    quantityInStock: {
      type: "number",
    },
    price: {
      type: "string",
    },
  },
};
