const jwt = require('jsonwebtoken');
const verifyToken = (req ,res,next )=>{
    const tokenheader = req.headers.authorization;
    if(!tokenheader){
        return res.status(401).json({ message: "Access Denied" });
    }
    const token = tokenheader.split(" ")[1];

    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({ message: "Invalid Token" });
    }
   
}
const verifyAdmin = (req, res, next) => {
    if(!req.user){
        return res.status(400).json({ message: "Invalid Token" });

    }
if(req.user.role && req.user.role.toLowerCase() === 'teacher'){
        return next(); 
    }
        return res.status(403).json({ message: "Access Denied" });

 }
module.exports = {verifyToken,verifyAdmin};