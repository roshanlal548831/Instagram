import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
  text:{
    type:String,
    required: true
  },
    
  author:{
    type:mongoose.Schema.Types.ObjectId,ref:"User",
    required: true
  },
  post:{
    type:mongoose.Schema.Types.ObjectId,ref:"User",
    required:true
  },
    
})
const Comment =  mongoose.model("comment",commentsSchema)

export default Comment