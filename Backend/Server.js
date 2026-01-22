import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import customOrderRoutes from "./Routes/CustomOrder.js";
import dotenv from "dotenv";


dotenv.config();

const web = express();

web.use(cors({
    // origin: "mongodb://localhost:27017/",
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
}));

web.use(express.json());
web.use("/uploads", express.static("uploads"));

mongoose.connect("mongodb://127.0.0.1:27017/custom-order")
    .then(()=> console.log("MongoDB connected"))
    .catch(err => console.err(err));

web.use("/api/custom-order", customOrderRoutes);

web.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
