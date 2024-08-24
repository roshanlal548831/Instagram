import { User } from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";
import { Post } from "../models/postModels.js";

export const register = async (req,res) => {
    try {
       const {name,username,password} = await req.body;
       const newdata = await req.body;
       console.log(newdata)
      
       const user = await User.findOne({username:username});
       if(user){
        return res.status(401).json({
            message: "try diffrent username",
            success: false
        });
       };

       const hashpassword = await bcryptjs.hash(password,10);
       console.log(name,username,hashpassword)



      const data =  await User({name,username,password:hashpassword});
      await data.save()

      const token = await jwt.sign({userId:User._id},process.env.SECRET_KEY,{expiresIn:"1d"});

       if(data){
           return res.cookie("token",token,{httpOnly:true,sameSite:"strict",maxAge:1*24*60*1000}).json({
            message: "Account created success",
            success: true
           })
       }
         
    } catch (error) {
        console.log("erroror" ,error)
    }
};


export const login = async(req,res) => {
    try {
        const {username,password} = await req.body;
        const fdata = await req.body
        console.log(fdata)
        const user = await User.findOne({username:username})
    
        if(!user){
            return res.status(401).json({
                message:"Incorrect email or password",
                success:false
            })
        };
    
        const hashpassword = await bcryptjs.compare(password,user.password);
        const token = await jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:"1d"});
        if(hashpassword){
            // populate each post if in the post array;
            const populatedPost = await Promise.all(
                user.posts.map(async (postId) => {
                    const post = await Post.findById(postId);
                    if(post.author.equals(user._id)){
                        return post
                        
                    }
                    return null
                })
            )
          const users = {
             _id:user.id,
             username:user.username,
             email:user.email,
             profilePicture:user.profilePicture,
             bio:user.bio,
             following:user.following,
             posts:populatedPost
            }
           return await res.cookie("token",token,{httpOnly:true,sameSite:"strict",maxAge:1*24*60*1000}).json({
            message: `welcome back ${user.username}`,
            users,
            success:true,
            token,
           });
          
        }else{
            return res.status(401).json({
                message:"wrong password",
                success:false,
                
            })
        };

    
        
    } catch (error) {
        res.send(error)
       console.log(error)
    }
};


export const logout = async(_,res)=>{
    try {       
        return await res.cookie("token","",{maxAge:0}).json({
            message:"Logged out successfully",
            success: true
        })

    } catch (error) {
        console.log(error)
    }
}

export const getProfile = async(req,res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).select("-password")
        return res.status(200).json({
            user,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

export const editProfile = async (req,res) => {
    try {
        const userId =  req.id;
        const{bio,gender} = req.body;
        const profilePicture = req.file;
        const user = await User.findById(userId).select("-password");
           
        let cloudRespone;
       if(profilePicture){
        const fileuri = getDataUri(profilePicture);
         cloudRespone = await cloudinary.uploader.upload(fileuri);
     
       };
        //  const user = await User.findById(userId);
       if(!user){
        return res.status(404).json({
            message: "user not found.",
            success: false
        })
       };

       if(bio)user.bio = bio;
       if(gender) user.gender;
       if(profilePicture) user.profilePicture = cloudRespone.secure_url;
       await user.save();

       return   res.status(200).json({
        message: "Profile updated",
        user: user,
        success: true
    })

        // console.log(id) 

    } catch (error) {
        console.log("this error",error)
        return   res.status(400).json(error)
    }
}

export const getSuggestedUsers = async (req,res) =>{
    try {
        const suggestedUser = await User.find({_id:{$ne:req.id}}).select("-password");
        if(!suggestedUser){
            return res.status(400).json({
                message: "Currently do not have any users.",
                success: false
            })
        };

        return   res.status(200).json({
            users:suggestedUser,
            success: true
        })
    
    } catch (error) {
        console.log(error)
    }
};

export const followeOrUnfollow = async (req,res) => {
    try {
        const followkarneWala = await req.id //roshan
        const jiskofollwkarunga = req.params.id //keshan

        if(followkarneWala === jiskofollwkarunga){
            return res.status(400).json({
                message: "You can not follow/unfollow yourself",
                success: false
            })
        };

        const user = await User.findById(followkarneWala);
        console.log(user)
        const targetUser = await User.findById(jiskofollwkarunga);

        if(!user || !targetUser){
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        };

        //  mai check karunga follow karna hai ki unfollow;
        const isFollowing = user.following.includes(jiskofollwkarunga);
        if(isFollowing){
            //unfollow login
            await Promise.all([
                User.updateOne({_id:followkarneWala},{$pull:{following:jiskofollwkarunga}}),
                User.updateOne({_id:jiskofollwkarunga},{$pull:{followers:followkarneWala}}),
            ])
            return res.status(200).json({
                message: "Unfollowed successfully",
                success: true
            })
        }else{
            // follow login ayega;
            await Promise.all([
                User.updateOne({_id:followkarneWala},{$push:{following:jiskofollwkarunga}}),
                User.updateOne({_id:jiskofollwkarunga},{$push:{followers:followkarneWala}}),
            ])
            return res.status(200).json({
                message: "follow successfully",
                success: true
            })
        }

    } catch (error) {
        console.log(error)
    }
}