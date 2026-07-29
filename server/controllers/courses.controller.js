function getCousespage(req , res){
  
    res.render("courses/courses", { title: "Couses" });
  
}
module.exports={
    getCousespage :getCousespage
}