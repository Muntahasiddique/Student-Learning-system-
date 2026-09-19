const mongoose = require("mongoose");
const replySchema = new mongoose.Schema({
    content: {
        type : String,
        required : true,
         trim : true,
    },
    author : {
        type : mongoose.Schema.Types.ObjectId, ref:'User' , required : true
    },
    threadId: {
type : mongoose.Schema.Types.ObjectId , ref:'Thread' , required : true
    },
    upvotes:{
  type : Number,
  default:0
    }
  
},
    {timestamps : true}
)

module.exports = mongoose.model('Reply' , replySchema);