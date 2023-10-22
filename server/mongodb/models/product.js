import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  quantityInStock: {
    type: Number,
    min: 0,
    required: true,
  },
});

export default mongoose.model("Product", productSchema);
