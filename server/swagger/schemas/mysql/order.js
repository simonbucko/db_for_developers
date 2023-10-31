export const MysqlOrder = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
    orderDate: {
      type: "string",
      format: "date",
    },
    shippedDate: {
      type: "string",
      format: "date",
    },
    comments: {
      type: "string",
    },
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
          name: {
            type: "string",
          },
          description: {
            type: "string",
          },
          price: {
            type: "string",
          },
          orderItem: {
            type: "object",
            properties: {
              quantity: {
                type: "number",
              },
            },
          },
        },
      },
    },
    orderStatus: {
      type: "object",
      properties: {
        status: {
          type: "string",
        },
      },
    },
  },
};

export const MysqlOrderInput = {
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
            type: "string",
          },
          quantity: {
            type: "number",
          },
        },
      },
    },
  },
};
