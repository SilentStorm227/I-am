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
        const existingName = await User.findOne({ name });
        if (existingName) {
            return res.json({ error: "Name already taken" });
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
        const {name, password} = req.body;

        const user = await User.findOne({name});
        
        if(!user){
            return res.json({error: "user not found"});
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.json({error: "wrong password"});
        }

        // 🔐 Create token
        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                role: usewr.role
            },
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        );

        res.json({
            success: true,
            token
        });
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
});

export default router;