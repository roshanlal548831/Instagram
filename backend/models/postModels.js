import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
   
    caption:{
        type:String,
        default: ""
    },
    image:{
        type:String,
        required:true,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,ref:"User",
        required: true
    },
    like:[{
        type:mongoose.Schema.Types.ObjectId,ref:"User",
    }],
    
    comments:[{
        type:mongoose.Schema.Types.ObjectId,ref:"Comment",
    }],
    
})
const Post =  mongoose.model("post",postSchema)
export default Post