const userModel = require("../models/user.model");
const Signup = async (req , res)=>{
const { name , email ,password,role } = req.body;
const existingUser = await userModel.findOne({email});
if(existingUser){
   return res.status(400).json({message:"already exists"});
}
const newUser = await userModel.create({name , email ,password,role})
return res.status(201).json({message : "Succefully Created"})
}
module.exports={
    Signup
}