const jwt = require("jsonwebtoken")
const SECRET_KEY = require(".//config");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        return res.status(411).json({
            msg: "No token exists"
        })
    } 
 
    try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, SECRET_KEY)
    
        req.userId = decoded.userId;
        next()
    } catch (err) {
        return res.status(403).json({
            error: []
        })
    }
}

module.exports = {
    authMiddleware
}