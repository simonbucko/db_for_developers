import mongoose from "mongoose";
const { Schema } = mongoose;

const employeeSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
  },
  phone: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
  },
  address: {
    type: {
      state: {
        type: String,
        trim: true,
        required: true,
        minlength: 3,
      },
      postalCode: {
        type: String,
        trim: true,
        required: true,
        minlength: 3,
      },
      city: {
        type: String,
        trim: true,
        required: true,
        minlength: 3,
      },
      street: {
        type: String,
        trim: true,
        required: true,
        minlength: 3,
      },
    },
    required: true,
  },
  job: {
    type: {
      title: {
        type: String,
        trim: true,
        required: true,
        minlength: 3,
      },
    },
  },
  office: {
    type: {
      name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3,
      },
      state: {
        type: String,
        trim: true,
        required: true,
        minlength: 3,
      },
      postalCode: {
        type: String,
        trim: true,
        required: true,
        minlength: 3,
      },
      city: {
        type: String,
        trim: true,
        required: true,
        minlength: 3,
      },
      street: {
        type: String,
        trim: true,
        required: true,
        minlength: 3,
      },
    },
  },
});

export default mongoose.model("Employee", employeeSchema);
