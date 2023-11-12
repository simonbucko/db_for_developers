export const Job = {
  id: {
    type: "uuid",
    primary: true,
    required: true,
  },
  title: {
    type: "string",
    required: true,
  },
  employees: {
    type: "relationship",
    target: "Employee",
    relationship: "HAS_JOB",
    direction: "in",
  },
};
