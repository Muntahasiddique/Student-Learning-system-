const mongoose = require("mongoose");
const threadSchema = new mongoose.Schema({
    title : {
         type : String , 
         required : true,
         trim : true,
         maxlength :[100, "Title cannot exceed 100 characters"],
    },
    content: {
        type : String,
        required : true,
         trim : true,
    },
    author : {
        type : mongoose.Schema.Types.ObjectId, ref:'User' , required : true
    },
    tags: {
type: [String],
default : []
    },
    upvotes:{
  type : Number,
  default:0
    }
  
},
    {timestamps : true}
)

module.exports = mongoose.model('Thread' , threadSchema);