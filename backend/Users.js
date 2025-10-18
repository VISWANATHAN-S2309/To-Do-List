const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    task:String,
    description:String,
    timedate:String,
    priority:String,
    category:String,
    status:Boolean,

})
const userModel=mongoose.model("users",userSchema);
module.exports=userModel;
