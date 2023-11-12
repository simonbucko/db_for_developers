export const Address = {
  id: {
    type: "uuid",
    primary: true,
    required: true,
  },
  state: {
    type: "string",
    required: true,
  },
  postalCode: {
    type: "string",
    required: true,
  },
  city: {
    type: "string",
    required: true,
  },
  street: {
    type: "string",
    required: true,
  },
  employees: {
    type: "relationship",
    target: "Employee",
    relationship: "LIIVES_AT",
    direction: "in",
  },
  office: {
    type: "relationship",
    target: "Office",
    relationship: "IS_LOCATED_AT",
    direction: "in",
  },
  office: {
    type: "relationship",
    target: "Customer",
    relationship: "HAS_ADDRESS",
    direction: "in",
  },
};
