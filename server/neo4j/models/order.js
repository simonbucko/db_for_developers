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
    required: true,
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
    type: "relationship",
    target: "Product",
    relationship: "CONTAINS",
    direction: "out",
    properties: {
      quantity: {
        type: "integer",
        required: true,
      },
    },
  },
};
