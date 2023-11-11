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
};
