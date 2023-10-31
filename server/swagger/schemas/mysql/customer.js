export const MysqlCustomer = {
  type: "object",
  properties: {
    id: {
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
      type: "string",
    },
    address: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
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
  },
};

export const MysqlCustomerInput = {
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

export const MysqlCustomerAddressUpdate = {
  type: "object",
  properties: {
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

export const MysqlCustomerUpdate = {
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
  },
};
