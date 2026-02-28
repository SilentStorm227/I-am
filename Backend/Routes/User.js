import express from "express";
import bcrypt from "bcrypt";
import User from "../Models/User.js";

const router = express.Router();

router.post("/signup", async(req, res) =>{
    try{
        const {email, name, password} = req.body;

        const existing = await User.findOne({email});
        if(existing){
            return res.json({error: "Email already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User ({
            email,
            name,
            password: hashedPassword
        });

        await newUser.save();

        res.json({ success: true});
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
});

export default router;