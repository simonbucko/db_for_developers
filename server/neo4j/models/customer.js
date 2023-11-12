export const Customer = {
  id: {
    type: "uuid",
    primary: true,
    required: true,
  },
  lastName: {
    type: "string",
    required: true,
  },
  firstName: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
  },
  phone: {
    type: "string",
    required: true,
  },
  orders: {
    type: "relationship",
    target: "Order",
    relationship: "PLACED",
    direction: "out",
  },
  address: {
    type: "relationship",
    target: "Address",
    relationship: "HAS_ADDRESS",
    direction: "out",
  },
  payments: {
    type: "relationship",
    target: "Payment",
    relationship: "PERFORM_PAYMENT",
    direction: "out",
  },
};
