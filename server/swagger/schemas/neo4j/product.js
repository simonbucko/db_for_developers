export const Neo4jProduct = {
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
    price: {
      type: "number",
    },
    quantityInStock: {
      type: "number",
    },
  },
};

export const Neo4jProductInput = {
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
