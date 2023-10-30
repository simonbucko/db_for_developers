export const MongodbOrder = {
  type: "object",
  properties: {
    _id: {
      type: "string",
    },
    orderDate: {
      type: "string",
      format: "date-time",
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
          price: {
            type: "number",
          },
          quantity: {
            type: "number",
          },
        },
      },
    },
    orderStatus: {
      type: "string",
    },
    customerId: {
      type: "string",
    },
    __v: {
      type: "number",
    },
  },
};

export const MongodbOrderInput = {
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
          name: {
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
