export const MysqlBigCustomer = {
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
    total_puchase_amount: {
      type: "string",
    },
  },
};
