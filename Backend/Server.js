import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import customOrderRoutes from "./Routes/CustomOrder.js";

const web = express();

web.use(cors({
    origin: "mongodb://localhost:27017/",
    methods: ["GET", "POST"],
}));

web.use(express.json());
web.use("/uploads", express.static("uploads"));

mongoose.connect("mongodb://127.0.0.1:27017/Iam")
    .then(()=> console.log("MongoDB connected"))
    .catch(err => console.err(err));

web.use("/api/custom-order", customOrderRoutes);

web.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});