const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const users=require("./Users");
const app=express();
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://localhost:27017/crud");


app.post("/createtask",async (req,res)=>{
   try{
      const task=await users.create(req.body);
      res.json({message:"task added successfully",task});
   }
   catch(err){
    res.status(500).json({error:err})
   }
})
app.get("/fetchusers",async(req,res)=>{
    try{
       const gettask=await users.find();
       res.json({message:"task getting successfully",gettask});
    }
    catch(err){
        res.status(500).json({error:err});
    }
})

app.delete("/deletetask/:id",async(req,res)=>{
    try{
       const id=req.params.id;
       await users.findByIdAndDelete(id);
       res.json({message:"deleted successfully"});
    }
    catch(err){
        res.status(500).json(err);
    }
})
app.put("/updatetask/:id",async(req,res)=>{
    try{
       const id=req.params.id;
       const updated=await users.findByIdAndUpdate(id,req.body,{new:true});
       res.json({message:"updated successfully",updated});
    }
    catch(err){
        res.status(500).json({err});
    }
})

const port=5500;
app.listen(port,()=>{
    console.log("App is runing at port 5500");
})