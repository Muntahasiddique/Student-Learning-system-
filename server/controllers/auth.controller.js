const userModel = require("../models/user.model");
const bcrypt = require('bcryptjs');
const Jwt = require('jsonwebtoken');
require('dotenv').config();

const Signup = async (req , res)=>{
    try {
const { name , email ,password, confirmpassword , role } = req.body;
if(!email || !password || !confirmpassword || !name || !role){
    return res.status(400).json({message : "Feild is Missing"})
}
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

if(!passwordRegex.test(password)){
    return res.status(400).json({message : "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."})
}
if(password != confirmpassword){
    return res.status(400).json({message : "Password must be matched"})
}

    const existingUser = await userModel.findOne({email});
if(existingUser){
   return res.status(400).json({message:"already exists"});
}
const newUser = await userModel.create({name , email ,password,role})
return res.status(201).json({message : "Successfully Created"})
} catch (error) {
    console.error("SignUp Database Error" , error)
            return res.status(500).json({message :"SignUp Database Error"})

}

}


const Login = async (req , res)=>{
     try {
    const {email,password} = req.body;
    if(!email || !password){
    return res.status(400).json({message : "Feild is Missing"})
}
   
        const User = await userModel.findOne({email});
    if(!User){
      return  res.status(400).json({message :"Invalid Credentials"});
    }
    const UserPassword = await bcrypt.compare(password,User.password);
      if(!UserPassword){
       return res.status(400).json({message :"Invalid Credentials"});
    }
      const jwttoken = Jwt.sign(
        {id :User._id},
        process.env.JWT_SECRET || 'fallback_secret_key',
        {expiresIn: '1d'}
     );
    return res.status(200).json({message : "Login Successfully" , token : jwttoken})
   
    } catch (error) {
        console.error("Login Database Error" , error)
        return res.status(500).json({message :"Login Database Error"})
    }


}

module.exports={
    Signup,
    Login
}