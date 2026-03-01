import jwt from "JsonWebToken";

export default function auth(req, res, next){
    const token = req.headers.authorization;

    if(!token){
        return res.ststus(401).json({error: "no token"})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // contains { id }
        next();
    }
    catch(err){
        res.status(401).json({error: "invalid token"});
    }
}
