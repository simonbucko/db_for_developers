export const Employee = {
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
  job: {
    type: "relationship",
    target: "Job",
    relationship: "HAS_JOB",
    direction: "out",
  },
  address: {
    type: "relationship",
    target: "Address",
    relationship: "LIVES_AT",
    direction: "out",
  },
  office: {
    type: "relationship",
    target: "Office",
    relationship: "WORKS_IN",
    direction: "out",
  },
};
