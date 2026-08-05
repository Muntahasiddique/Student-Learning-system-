const courseModel = require('../models/course.model');
const createCourse = async (req,res)=>{
    try {

        const {title, description, duration, degree, difficulty, category, price, coursecode, instructor, createdBy}=req.body;
        if(!title || !description || !duration || !degree ||  !difficulty ||  !category || price === undefined || price === null || !coursecode || !instructor ||  !createdBy){
            return res.status(400).json({message: "Feild is Missing"});
        }
const existingCourseCode = await courseModel.findOne({coursecode});
if(existingCourseCode){
    return res.status(400).json({message: "Course exists"});
}
const newCourse =await courseModel.create({title, description, duration, degree, difficulty, category, price, coursecode, instructor, createdBy})
return res.status(201).json({message: "Course Created"});

    } catch (error) {
        console.error("Course Creation Database Error" , error);
        return res.status(500).json({message :"Course Creation Database Error"})
    }
}


const getAllCourses = async (req , res) =>{

    try {

        const courseList =await courseModel.find({})
return res.status(200).json({message: "Course Found" , courses : courseList});
        
    } catch (error) {
        console.error("Course List Database Error" , error);
        return res.status(500).json({message :"Course List Database Error"})
    }
}

module.exports = {
    createCourse,
    getAllCourses
}
