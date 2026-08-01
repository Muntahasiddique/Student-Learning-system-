const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');
const userSchema = new mongoose.Schema(
    {
    name:{type : String , required:true , trim : true},
    email:{type: String , unique: true , required : true , lowercase: true},
    password:{type : String , required : true},
    role:{type : String, required :true },
  
    },
 { timestamps:true}
)
userSchema.pre('save' , async function(){
if(this.isModified("password")){
    const salt = await bycrypt.genSalt(12);
   this.password = await  bycrypt.hash(this.password ,salt);

}

})
module.exports = mongoose.model('User' , userSchema);