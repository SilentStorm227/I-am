import express from "express";
import bcrypt from "bcrypt";
import User from "../Models/User.js";
import jwt from "jsonwebtoken";

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

router.post("/login", async (req, res)=>{
    try{
        const {name, password} = requestAnimationFrame.body;

        const user = await user.findOne({name});
        if(!user){
            return res.json({error: "user not found"});
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.json({error: "wrong password"});
        }

        res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email:user.email
            }
        });
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
});

export default router;