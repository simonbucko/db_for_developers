export const Office = {
  id: {
    type: "uuid",
    primary: true,
    required: true,
  },
  name: {
    type: "string",
    required: true,
  },
  employees: {
    type: "relationship",
    target: "Employee",
    relationship: "WORKS_IN",
    direction: "in",
  },
  address: {
    type: "relationship",
    target: "Address",
    relationship: "IS_LOCATED_AT",
    direction: "out",
    cascade: "delete",
  },
};
