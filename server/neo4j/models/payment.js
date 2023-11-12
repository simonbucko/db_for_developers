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
    precistion: 2,
    required: false,
  },
  order: {
    type: "relationship",
    target: "Order",
    relationship: "PAID_FOR",
    direction: "out",
  },
  customer: {
    type: "relationship",
    target: "Customer",
    relationship: "PERFORM_PAYMENT",
    direction: "in",
  },
};
