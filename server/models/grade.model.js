const mongoose = require("mongoose");
const gradeSchema = new mongoose.Schema(
    {
        user : {type : mongoose.Schema.Types.ObjectId , ref :'User' , required:true },
        course : { type: mongoose.Schema.Types.ObjectId , ref : 'Course' , required:true },
    
    score:{type : Number,required :true },
     letterGrade:{type : String,required :true },
      assessmentName:{type : String,required :true }},
    { timestamps: true }
)

module.exports = mongoose.model ('Grade'  ,gradeSchema);