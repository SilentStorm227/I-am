import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import customOrderRoutes from "./Routes/CustomOrder.js";
import dotenv from "dotenv";
import userRoutes from './Routes/User.js'
import reviewRoutes from "./Routes/review.js";
import Stripe from "stripe";

const stripe = new Stripe("WeLove@nimals");

dotenv.config();
const web = express();
web.use(cors({
    // origin: "mongodb://localhost:27017/",
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
}));

web.use(express.json());
web.use("/uploads", express.static("uploads"));

mongoose.connect("mongodb://127.0.0.1:27017/iam")
    .then(()=> console.log("MongoDB connected"))
    .catch(err => console.err(err));

web.use("/api/custom-order", customOrderRoutes);
web.use("/api/users", userRoutes);

web.use(reviewRoutes);

web.post("/api/checkout", async (req, res) =>{
    try{
        const {cart} = req.body;
        const lineItems = cart.map(item => ({
            price_data: {
                currency: "gbp",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
                        line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cart",
        });

        res.json({url: session.url});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: "stripe error" });
    }
});

web.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
