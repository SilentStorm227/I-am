import express from "express";
import multer from "multer";
import CustomOrder from "../Models/CustomOrder.js";
import nodemailer from "nodemailer"

const web = express();


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

router.get("/", async(req, res) => {
    const orders = await CustomOrder.find();
    res.json(orders);
});

router.put("/:id", async (req, res) => {
    const {price, status} = req.body;

    const updated = await CustomOrder.findByIdAndUpdate(
        req.params.id,
        {price, status},
        {new: true}
    );

    // SEND EMAIL
    await transporter.sendMail({
        to: "customer@email.com", // later you can store user email
        subject: "Your custom order is ready!",
        text: `Your custom order has been priced at $${price}.`
    })

    res.json(updated);

})

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});



export default router;