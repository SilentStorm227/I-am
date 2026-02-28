import mongoose from "mongoose";

const customOrderSchema = new mongoose.Schema({
    message: String,
    image: String,
    status: {
        type: String,
        enum: ["pending", "priced", "completed"],
        default: "pending"
    },
    price: {
        type: Number,
        default: null
    }
},

{timestamps: true}

);

export default mongoose.model("CustomOrder", customOrderSchema);