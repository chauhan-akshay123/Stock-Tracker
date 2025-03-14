const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");
    if(!token) return res.status(401).json({ message: "Access Denied: No Token Provided" });

    try{
      const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");  
      next();
    } catch(error){
        return res.status(400).json({ message: "Invalid Token" });
    }
};

module.exports = authMiddleware;