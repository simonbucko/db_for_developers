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
    eager: true,
    cascade: "detach",
  },
  address: {
    type: "relationship",
    target: "Address",
    relationship: "HAS_ADDRESS",
    direction: "out",
    eager: true,
    cascade: "delete",
  },
  payments: {
    type: "relationship",
    target: "Payment",
    relationship: "PERFORM_PAYMENT",
    direction: "out",
    eager: true,
    cascade: "detach",
  },
};
