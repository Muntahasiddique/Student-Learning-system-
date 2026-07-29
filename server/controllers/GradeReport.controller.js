function getReport(req , res){
  
    res.render("courses/GradeReport", { title: "Course_Progress" });
  
}
module.exports={
    getReport:getReport
}