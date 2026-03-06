import jwt from "jsonwebtoken";

export default function auth(req, res, next){
    const header = req.headers.authorization;

    if(!header){
        return res.status(401).json({error: "no token"})
    }

    const token = header.split(" ")[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // contains { id }
        next();
    }
    catch(err){
        res.status(401).json({error: "invalid token"});
    }
}
