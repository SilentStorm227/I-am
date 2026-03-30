import express from "express";
import Review from "../Models/review.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// GET reviews for a product
router.get("/api/reviews/:productId", async (req, res) => {
    try {
        const reviews = await Review.find({ productId: req.params.productId });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: "Error loading reviews" });
    }
});

// POST a review
router.post("/api/reviews", upload.single("image"),  async (req, res) => {
    try {
        const newReview = new Review(req.body);
        await newReview.save();
        res.json(newReview);
    } catch (err) {
        res.status(500).json({ message: "Error saving review" });
    }
});

export default router;