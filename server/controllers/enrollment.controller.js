const enrollmentModel = require('../models/enrollment.model');
const courseModel = require('../models/course.model');
const enrollCourse =  async (req ,res)=>{
try {
    const userId = req.user.id;
    const {courseId} = req.params;
const enrolledCourse = await enrollmentModel.findOne({ user: userId, course: courseId });
if(enrolledCourse){
    return res.status(400).json({message: "Already enrolled"});

}
await enrollmentModel.create({ user: userId, course: courseId });
await courseModel.findByIdAndUpdate(courseId, { $inc: { enrolledCount: 1 } });
return res.status(201).json({ message: "Successfully enrolled in the course!" });
} catch (error) {
            return res.status(500).json({message :"Course not enrolled Database Error"});
}
    
}
const unenrollCourse = async (req ,res)=>{
    try {
         const userId = req.user.id;
    const {courseId} = req.params;
        const result = await enrollmentModel.findOneAndDelete({ user: userId, course: courseId });
        if (!result) { 
                        return res.status(400).json({message: "Failed to unenroll"});
         }
         await courseModel.findByIdAndUpdate(courseId, { $inc: { enrolledCount: -1 } });
return res.status(200).json({ message: "Successfully unenrolled in the course!" });


  } catch (error) {
    console.error(error);
    return res.status(500).json({message :"Course not unenrolled Database Error"});
}
}

const getMyEnrollments = async (req , res)=>{
try {
        const userId = req.user.id;
        const myEnrolledcourses = await enrollmentModel.find({ user: userId }).populate('course');
       if (myEnrolledcourses.length === 0) {
  return res.status(200).json({ message: "Not enrolled in Any course", myEnrolledcourses: [] });
}

                return res.status(200).json({myEnrolledcourses:myEnrolledcourses})
} catch (error) {
     console.error(error);
    return res.status(500).json({message :"Any Course not Found Database Error"});
}

}
module.exports = {
 enrollCourse,
 unenrollCourse,
 getMyEnrollments
   
}

