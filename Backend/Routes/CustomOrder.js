import express from "express";
import multer from "multer";
import CustomOrder from "../Models/CustomOrder.js";
import auth from "../Middleware/Auth.js";
import transporter from "../utils/mailer.js";

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
router.post("/", auth, upload.single("image"), async (req,res) => {
    try{
        console.log("🔥 ROUTE HIT");
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);
        
        const newOrder = new CustomOrder({
            message: req.body.message,
            image: req.file ? req.file.filename : null,
            userId: req.user.id
        });

        await newOrder.save();
        res.json({success: true});
    }catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.get("/", auth, async (req,res) => {
    const orders = await CustomOrder.find({
        userId: req.user.id
    }).sort({ createdAt: -1 });
    res.json(orders);
});

router.get("/all", auth, async(req, res) => {

    // 🔒 Admin check
    if(req.user.role !== "admin"){
        return res.status(403).json({error: "Not authorized!!"});
    }

    try{
        const orders = await CustomOrder
        .find()
        .populate("userId", "name"); // show user & name

        res.json(orders);
    }
    catch(err){
        res.status(500).json({error: "server error"})
    }
})

router.put("/:id", auth, async (req, res) => {

    if(req.user.role !== "admin"){
        return res.status(403).json({error: "not authorized"});
    }

    const {price, status} = req.body;

    const order = await CustomOrder.findByIdAndUpdate(
        req.params.id,
        {price, status},
        {new: true}
    )
    .populate("userId");

    // SEND EMAIL
    if (status === "priced"){

    await transporter.sendMail({
        to: order.userId.email, // later you can store user email
        subject: "Your custom beaded order is ready! ✨",
        text: `
    <div style="background:#FFF7E8;padding:40px;font-family:Arial, sans-serif;">
        
        <div style="max-width:520px;margin:auto;background:white;border-radius:14px;overflow:hidden;box-shadow:0 5px 15px rgba(0,0,0,0.05);">

            <div style="background:#87CEEB;padding:20px;text-align:center;">
                <h2 style="margin:0;color:white;">Your custom order is ready! 🧸</h2>
            </div>

            <div style="padding:25px;color:#444;">

                <p>Hi <b>${order.userId.name}</b>,</p>

                <p>
                Your custom beaded creation is finished and ready to order!
                </p>

                <div style="background:#FFF7E8;padding:15px;border-radius:10px;margin:20px 0;font-size:18px;">
                    <strong>Price:</strong> $${price}
                </div>

                <p>
                You can now log in to your account and add it to your cart.
                </p>

                <div style="text-align:center;margin:30px 0;">
                    <a href="http://localhost:5173/custom-order"
                       style="background:#87CEEB;color:white;padding:12px 22px;text-decoration:none;border-radius:8px;font-weight:bold;">
                       View my custom order
                    </a>
                </div>

                <p style="margin-top:30px;">
                Thank you for supporting handmade creations 💙
                </p>

                <p style="font-size:12px;color:#888;margin-top:30px;">
                If you didn't request this order, you can safely ignore this email.
                </p>

            </div>
        </div>

    </div>
    `
    });
    }
    res.json(order);

});

export default router;