function getdsapage(req , res){
  
    res.render("ContentPages/dsa", { title: "dsaDetails" });
  
}
module.exports={
    getdsapage :getdsapage
}