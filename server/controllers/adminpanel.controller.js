function Adminpanelpage(req , res){
  
    res.render("admin/adminpanel", { title: "adminpanel" });
  
}
module.exports={
    Adminpanelpage :Adminpanelpage
}