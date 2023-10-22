import mongoose from "mongoose";
const { Schema } = mongoose;

const paymentSchema = new Schema({
  paymentDate: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  orderId: {
    type: Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
});

export default mongoose.model("Payment", paymentSchema);
