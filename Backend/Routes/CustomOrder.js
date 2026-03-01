import express from "express";
import multer from "multer";
import CustomOrder from "../Models/CustomOrder.js";
import nodemailer from "nodemailer"
import auth from "../Middleware/Auth.js";

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



const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

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

router.ger("/all", auth, async(req, res) => {

    // 🔒 Admin check
    if(req.user.role !== "admin"){
        return res.status(403).json({error: "Not authorized!!"});
    }

    try{
        const orders = await CustomOrder
        .find()
        .populate("user", "name"); // show user & name

        res.json(orders);
    }
    catch(err){
        res.status(500).json({error: "server error"})
    }
})

router.put("/:id", async (req, res) => {
    const {price, status} = req.body;

    const order = await CustomOrder.findByIdAndUpdate(
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

    res.json(order);

})

export default router;