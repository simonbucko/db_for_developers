import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema({
  orderDate: {
    type: Date,
    required: true,
  },
  shippedDate: {
    type: Date,
  },
  comments: {
    type: String,
    trim: true,
  },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      name: {
        type: String,
        trim: true,
        required: true,
      },
      quantity: {
        type: Number,
        min: 1,
        required: true,
      },
      price: {
        type: Number,
        min: 0,
        required: true,
      },
    },
  ],
  orderStatus: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
  },
  paymentId: {
    type: Schema.Types.ObjectId,
    ref: "Payment",
    required: true,
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
});

export default mongoose.model("Order", orderSchema);
