function getForum(req , res){
  
    res.render("forum/forum", { title: "forum" });
  
}
module.exports={
 getForum:getForum
}