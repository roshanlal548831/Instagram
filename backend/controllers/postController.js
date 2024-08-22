import sharp from "sharp"
import cloudinary from "../utils/cloudinary.js";
import { Post } from "../models/postModels.js";
import { User } from "../models/userModel.js";
import { Comment } from "../models/commentModel.js";

export const addnewPost = async(req,res) => {
    try {
        const {caption} = req.body;
        const image = req.file;
        const authorid = req.id
        if(!image)return res.status(400).json({ message: "image required"  });

        // image upload
        const optimizationBuffer = await sharp(image.buffer).resize({
            width:800,
            height:800,
            fit:"inside",
            
        }).toFormat("jpeg",{quality:80}).toBuffer();
      // buffer to data uri
        const fileUri = `data:image/jpeg;base64,${optimizationBuffer.toString("base64")}`
        const cloudResponese = await cloudinary.uploader.upload(fileUri);
        const post = await Post.create({
            caption,
            image: cloudResponese.secure_url,
            author:authorid
        });

       const user = await User.findById(authorid);
       
       if(user){
        user.posts.push(post._id)
        await user.save()
       }
   
       await post.populate({path:"author",select:("-password")})

       return res.status(200).json({
        post,
        message:"New post added",
        success,
       })


    } catch (error) {
        
    }
};

export const getAllpost = async (req,res) => {
    try {
        const posts = await Post.find().sort({createdAt:-1})
        .populate({path:"author",select:'username , profilePicture'})
        .populate({
            path:"comments",
            sort:{createdAt:-1},
            populate:{
                 path:"author",
                 select:"username , profilePicture"
            }
           
        });

        return res.status(200).json({
            posts,
            success:true
        })
    } catch (error) {
        
    }
};


export const  getUserPost = async (req,res) =>{
      try {
        const authorId = req.id;
        const posts = await Post.find({author:authorId}).sort({createdAt:-1}).populate({
            path:"author",
            select:"username , profilePicture"
        }).populate({
            path:"comments",
            sort:{createdAt:-1},
            populate:{
                 path:"author",
                 select:"username , profilePicture"
            }
           
        });

        
        return res.status(200).json({
            posts,
            success:true
        })

      } catch (error) {
        console.log(error)
        
      }
};


export const likePost = async (req,res) =>{
    try {
        const likekarneWalakiId = req.id;
        const postId = req.params.id;
        const post = await Post.findById({postId})
        if(!post) return res.status(404).json({message:"Post not found",success:false})
            // like logic started 
        await post.updateOne({$addToSet:{likes:likekarneWalakiId}});
// $addToSet => only ek hi like kar sakta hai
        await post.save();

        // imlement socket.io for time notification

    return res.status(200).json({message:"Post liked",success:true})

    } catch (error) {
        console.log(error)
    }
}
export const dislikePost = async (req,res) =>{
    try {
        const likekarneWalakiId = req.id;
        const postId = req.params.id;
        const post = await Post.findById({postId})
        if(!post) return res.status(404).json({message:"Post not found",success:false})
            // like logic started 
        await post.updateOne({$pull:{likes:likekarneWalakiId}});
// $pull delete kar deta hai
        await post.save();

        // imlement socket.io for time notification

    return res.status(200).json({message:"Post disliked",success:true})

    } catch (error) {
        console.log(error)
    }
};



export const  addComment = async (req,res) =>{
      try {
        const postId = req.params.id;
        const commentkarnewalaUserkiId = req.id;
        const {text} = req.body;
        const post = await Post.findById(postId);
        if(!text)return res.status(400).json({message:"text is required",success:true});
        const comment = await Comment.create({
            text,
            author:commentkarnewalaUserkiId,
            post:postId
        }).populate({
            path:"author",
            select:"username , profilePicture"
        });


        post.comments.push(comment._id);
        await post.save();

        return res.status(201).json({
            message:"Commenst added",
            comment,
            success: true
        })
        
      } catch (error) {
        console.log(error)
        
      }
};

export const getCommentsPost = async (req,res) =>{
    try {
         const postId = req.params.id;

         const comments = await Comment.find({post:postId}).populate("author","username , profilePicture");
         if(!comments) return res.status(404).json({message:"No commenst found for this post image", success:false});
         return res.status(200).json({success:true,comments})
    } catch (error) {
        console.log(error)
        
    }
};

export const deletePost = async (req,res) => {
    try {
        const postId = req.params.id;
        const authorId = req.id;
        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({ message:"Post not found",success: false});

       // check if the logged-in user is the awner of the post

       if(post.author.toString() !== authorId) return res.status(403).json({ message:"Unauthorized"});

       //delere post 

       await Post.findByIdAndDelete(postId);

       // remove the post id from the user post
     let user = await User.findById(authorId)
     user.posts = user.posts.filter(id => id.toString()  !== postId );
     await user.save();

     // delete associated comments 
     await Comment.deleteMany({post:postId});
     return res.status(200).json({message:"Post delete success",success:true});
    } catch (error) {
        
    }
};


export const bookmarkPost = async (req,res) =>{
    try {
        const postId = req.params.id;
        const authorIs = req.id;
        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({
            message:"Post not found ",
            success:false
        });

        const user = await User.findById(authorIs);
        if(user.bookmarks.includes(post._id)){
          // already bookmaekd -> remove from the bookmark 
          await user.updateOne({$pull:{bookmarks:post._id}});
          await user.save();
          return res.status(200).json({type:"unsaved",message:"Post removed from bookmark",success:true});
        }else{
            // bookmark karna pdega
            await user.updateOne({$pull:{bookmarks:post._id}});
            await user.save();
            return res.status(200).json({type:"saved",message:"Post bookmark",success:true});
        };
         
    } catch (error) {
        console.log(error)
        
    }
};


