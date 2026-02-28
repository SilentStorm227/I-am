import jwt from "jsonwebtoken";

router.post("/login", async(requestAnimationFrame, res)=>{
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