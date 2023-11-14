export const Neo4jCustomer = {
  type: "object",
  properties: {
    _id: {
      type: "string",
    },
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
    email: {
      type: "string",
      format: "email",
    },
    phone: {
      type: "number",
    },
    address: {
      type: "object",
      properties: {
        street: {
          type: "string",
        },
        city: {
          type: "string",
        },
        postalCode: {
          type: "string",
        },
        state: {
          type: "string",
        },
      },
    },
    payments: {
      type: "array",
      items: {
        type: "string",
      },
    },
    orders: {
      type: "array",
      items: {
        type: "string",
      },
    },
  },
};

export const Neo4jCustomerInput = {
  type: "object",
  properties: {
    lastName: {
      type: "string",
    },
    firstName: {
      type: "string",
    },
    phone: {
      type: "string",
    },
    email: {
      type: "string",
      format: "email",
    },
    state: {
      type: "string",
    },
    postalCode: {
      type: "string",
    },
    city: {
      type: "string",
    },
    street: {
      type: "string",
    },
  },
};
