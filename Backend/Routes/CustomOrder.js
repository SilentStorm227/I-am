import express from "express";
import multer from "multer";
import CustomOrder from "../Models/CustomOrder.js";

const router = express.Router();

// image upload config
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({storage});

// POST custom order
router.post("/", upload.single("image"), async (req,res) => {
    try{
        console.log("🔥 ROUTE HIT");
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);
        
        const newOrder = new CustomOrder({
            message: req.body.message,
            image: req.file ? req.file.filename : null
        });

        await newOrder.save();
        res.json({success: true});
    }catch (err) {
        res.status(500).json({error: err.message});
    }
});

export default router;