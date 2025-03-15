const User = require("../models/User");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
    try{
      const { username, email, password } = req.body;
      const userExists = await User.findOne({ email });
      if(userExists) return res.status(400).json({ message: "User already exists" });  
      
      const user = new User({ username, email, password });
      await user.save();

      res.status(201).json({ message: "User registered successfully." });
    } catch(error){
        res.status(500).json({ message: "Server Error", error });
    }
};

const login = async (req, res) => {
    try{
      const { email, password } = req.body;
      const user = await User.FindOne({ email });
      if(!user) return res.status(400).json({ message: "Invalid Credentials: Username not found" });
      
      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch) return res.status(400).json({ message: "Invalid Credentials" });
      
      const token = user.generateAuthToken();
      res.status(200).json({ message: "Login Successful", token });
    } catch(error){
        res.status(500).json({ message: "Server Error", error });
    }
};
 
module.exports = { register, login };