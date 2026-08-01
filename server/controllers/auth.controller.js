const userModel = require("../models/user.model");
const Signup = async (req , res)=>{
const { name , email ,password,role } = req.body;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

if(!passwordRegex.test(password)){
    return res.status(400).json({message : "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."})
}

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