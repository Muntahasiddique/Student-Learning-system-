function getHomepage(req , res){
  
        res.render("pages/home", { title: "Home" });
      
}
module.exports={
    getHomepage :getHomepage
}