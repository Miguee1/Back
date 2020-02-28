 const mongoose =require ('mongoose');
 
 const TaskSchema= new mongoose.Schema ({
     title: String,
     description :String
    
 });
 module.exports={
     Task: mongoose.model('Task',TaskSchema)
    }



