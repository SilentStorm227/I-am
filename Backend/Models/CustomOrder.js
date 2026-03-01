import mongoose from "mongoose";

const customOrderSchema = new mongoose.Schema({
    message: String,
    image: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "priced", "completed"],
        default: "pending"
    },
    price: {
        type: Number,
        default: 0
    }
},

{timestamps: true}

);

export default mongoose.model("CustomOrder", customOrderSchema);