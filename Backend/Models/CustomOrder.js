import mongoose from "mongoose";

const customOrderSchema = new mongoose.Schema({
    message: String,
    image: String,
    status: {
        type: String,
        default: "Pending......."
    },
    price: {
        type: Number,
        default: null
    }
},

{timestamps: true}

);

export default mongoose.model("CustomOrder", customOrderSchema);