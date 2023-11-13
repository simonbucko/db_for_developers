export const Payment = {
  id: {
    type: "uuid",
    primary: true,
    required: true,
  },
  paymentDate: {
    type: "date",
    required: true,
  },
  amount: {
    type: "float",
    required: false,
  },
  order: {
    type: "relationship",
    target: "Order",
    relationship: "PAID_FOR",
    direction: "out",
    cascade: "detach",
  },
  customer: {
    type: "relationship",
    target: "Customer",
    relationship: "PERFORM_PAYMENT",
    direction: "in",
  },
};
