export const Product = {
  id: {
    type: "uuid",
    primary: true,
    required: true,
  },
  name: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
    required: true,
  },
  quantityInStock: {
    type: "int",
    required: true,
  },
  price: {
    type: "float",
    required: true,
  },
  products: {
    type: "relationships",
    target: "Product",
    relationship: "CONTAINS",
    direction: "in",
    properties: {
      quantity: {
        type: "integer",
        required: true,
      },
    },
  },
};
