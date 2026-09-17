const gradeModel = require('../models/grade.model');
const GradeReport = async(req,res)=>{
    try {
        const {user, course, score, letterGrade,  assessmentName}= req.body;
        if(!user || !course || !score || !letterGrade || !assessmentName){
            return res.status(400).json({message: "Feild is Missing"});
        }
        await gradeModel.create({user , course ,score, letterGrade,  assessmentName})
return res.status(201).json({message: "Grades Generated"});        
    } catch (error) {
        console.error("Grade Creation Database Error" , error);
        return res.status(500).json({message :"Grade Creation Database Error"})
    }
}

const getStudentGrades = async (req , res)=>{
    try {
        const userId = req.user.id;
      const UserGrades=  await gradeModel.find({user : userId}).populate('course', 'title coursecode'); // coure mai sy Title extract
            return res.status(200).json({message: "Grades Found" , UserGrades : UserGrades});

    } catch (error) {
        console.error("Grades Database Error" , error);
        return res.status(500).json({message :"Grades Database Error"})
    }
}

module.exports = {
    GradeReport,
    getStudentGrades

};