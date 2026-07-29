function getcodeeditorpage(req , res){
  
    res.render("playground/code-editor", { title: "code-editor" });
  
}
module.exports={
    getcodeeditorpage :getcodeeditorpage
}