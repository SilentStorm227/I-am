import mongoose from "mongoose";

const customOrderSchema = new mongoose.Schema({
    message: String,
    image: String,
    CreatedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("CustomOrder", customOrderSchema);