function getDegree(req , res){
  
    res.render("courses/degree", { title: "Degree" });
  
}
module.exports={
    getDegree :getDegree
}