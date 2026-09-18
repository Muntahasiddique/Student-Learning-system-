const gradeModel = require('../models/grade.model');
const getDegreeProgress = async (req, res)=>{
    try {
        const grade = await gradeModel.find({user : req.user.id}).populate('course');
        if(!grade || grade.length === 0){
            return res.status(200).json({
                totalCredits: 0,
                gpa: 0,
                coursesCompleted: 0
            })
        }
       const gradeScale = {
            'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7,
            'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'F': 0.0
        };

        let totalGradePoint =0;
        let totalCredits = 0;
        let coursesCompleted= 0;


        grade.forEach((gradeDoc)=>{
           const gradePoint = gradeScale[gradeDoc.letterGrade.toUpperCase()];

           const credits = gradeDoc.course?.credits || 3;
           if(gradePoint !== undefined && gradePoint > 0 ){
            totalGradePoint = totalGradePoint + gradePoint * credits;
            totalCredits = totalCredits + credits;
            coursesCompleted = coursesCompleted + 1;
           }
        })

        const gpa = totalCredits == 0 ? "0.0" : (totalGradePoint/ totalCredits).toFixed(2);
        return res.status(200).json({
            totalCredits,
            gpa: Number(gpa),
            coursesCompleted
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error calculating degree progress" });
    
    }
}

module.exports = {getDegreeProgress}