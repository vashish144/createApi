import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  styleCode: { type: String, required: true },
  // seller: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
  image: { type: String },
  sizes: [Number], //{type: String, required: true},
  brand: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  countInStock: { type: Number, required: true },
  rating: { type: Number, required: true },
  numReviews: { type: Number, required: true },
  // reviews: [reviewSchema],
});

const Product = mongoose.model("Product", productSchema);

export default Product;
