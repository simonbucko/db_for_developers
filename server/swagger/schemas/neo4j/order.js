export const Neo4jOrder = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
    orderDate: {
      type: "string",
      format: "date-time",
    },
    orderStatus: {
      type: "string",
    },
  },
};

export const Neo4jOrderInput = {
  type: "object",
  properties: {
    customerId: {
      type: "string",
    },
    products: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
          price: {
            type: "number",
          },
          quantity: {
            type: "number",
          },
        },
      },
    },
  },
};
