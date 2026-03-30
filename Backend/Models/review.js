import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    productId: Number,
    message: String,
    rating: Number,
    image: String
});

export default mongoose.model("Review", reviewSchema);