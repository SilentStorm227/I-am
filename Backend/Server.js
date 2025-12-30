import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import customOrderRoutes from "./Routes/CustomOrder";

const web = express();

web.use(cors());
web.use(express.json());
web.use("/uploads", express.static("uploads"));

mongoose.connect("mongodb://127.0.0.1:27017/customOrders");

web.use("/api/custom-order", customOrderRoutes);

web.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});