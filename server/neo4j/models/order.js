export const Order = {
  id: {
    type: "uuid",
    primary: true,
    required: true,
  },
  orderDate: {
    type: "date",
    required: true,
  },
  shippedDate: {
    type: "date",
    required: false,
  },
  comments: {
    type: "string",
    required: false,
  },
  status: {
    type: "string",
    required: true,
  },
  products: {
    type: "relationships",
    target: "Product",
    relationship: "CONTAINS",
    direction: "out",
    properties: {
      quantity: {
        type: "integer",
        required: true,
      },
    },
    eager: true,
    cascade: "detach",
  },
  payment: {
    type: "relationship",
    target: "Payment",
    relationship: "PAID_FOR",
    direction: "in",
    eager: true,
  },
  customer: {
    type: "relationship",
    target: "Customer",
    relationship: "PLACED",
    direction: "in",
    eager: true,
  },
};
