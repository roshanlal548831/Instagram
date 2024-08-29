import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React, { useState } from 'react'
import { Bookmark, MessageCircle, MoreHorizontal, Send } from 'lucide-react'
import { Button, } from './ui/button'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from './CommentDialog'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import axios from 'axios'
import { setPost } from '@/redux/PostSlice'

const Post = ({post}) => {
  const[open,setOpen] = useState(false)
  const[text,setText] = useState("")
  
  const {user} = useSelector((store) => store.auth)

  const[liked,setLike] = useState(post.likes.includes(user?._id) || false);
  const[postLike,setPostLike] = useState(post.likes.length)
  const {posts} = useSelector((store) => store.post)
  const dispatch = useDispatch()
  const changeEventHandler = (e) => {
       const inputText = e.target.value;
       if(inputText.trim()){
        setText(inputText)
       }else{
        setText("")
       }
  };

const likeOrDislikeHanler = async () =>{
    try {
      const action = liked ? "dislike" : "like"
      const res = await axios.get(`api/v1/post/${post._id}/${action}`,{withCredentials:true});
      console.log(res)
         if(res.data.success){
          setLike(!liked)
          const updatedLike = liked ? postLike -1 : postLike +1
          setPostLike(updatedLike);
          //apne post ki update karunga
          const updatedPostDate = posts.map(p=> p._id === post._id ? {
            ...p,
            likes:liked ? p.likes.filter(id=> id === user._id): [...p.likes,user._id]
          }:p
        );
        dispatch(setPost(updatedPostDate))
          toast.success(res.data.message);
         }
    } catch (error) {
      console.log(error);
      
    }
}

  const deletePostHandler = async() => {
       try {
        const res = await axios.delete(`/api/v1/post/delete/${post?._id}`,{withCredentials:true})
        const updatedPostData = posts.filter((postItem)=> postItem?._id !== post?._id);
        dispatch(setPost(updatedPostData))
        toast.success(res.data.message)

        console.log(res)
       } catch (error) {
         console.log(error);
         toast.error(error.response.data.message)
         
       }
  }
  return (
    <>
  <div className=' my-8 w-full max-w-sm mx-auto'>
      <div className=' flex items-center justify-between'>     
          <div className='items-center gap-2 flex'>
           <Avatar>
             <AvatarImage src={post.author.profilePicture} className=' rounded-3xl h-12 w-12'/>
             <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1>{post.author?.username}</h1>
      </div>
      <Dialog>
         <DialogTrigger asChild>
            <MoreHorizontal className=' cursor-pointer'/>
         </DialogTrigger>   
            <DialogContent className="flex flex-col items-center text-sm text-center">
              <Button variant="ghost" className=" cursor-pointer w-fit text-[#ED4946] font-bold" >Unfollow</Button>
              <Button variant="ghost" className=" cursor-pointer w-fit " >Add to favorites</Button>
              {
                user && user?._id === post?.author._id &&   <Button onClick={deletePostHandler} variant="ghost" className=" cursor-pointer w-fit" >Delete</Button>

              }
           </DialogContent>
      </Dialog>
    </div>
             <img 
              src={post.image} 
             className=' rounded-sm my-2 w-full aspect-square object-contain-cover' 
             alt="" /> 
       <div className=' flex items-center justify-between my-2'>
         <div className='flex items-center gap-3'>
          {
            liked ? <FaHeart size={"24"} onClick={likeOrDislikeHanler}  className=' cursor-pointer text-red-600'/> :   <FaRegHeart onClick={likeOrDislikeHanler} className=' cursor-pointer' size={'22px'}/>
          }
              <MessageCircle onClick={() => setOpen(true)} className='cursor-pointer hover:text-gray-600 '/>
               <Send  className=' cursor-pointer hover:text-gray-600'/>
         </div>
            <Bookmark className=' cursor-pointer hover:text-gray-600'/>
      </div>
      <span className='font-medium block md-2'>{postLike} likes</span>
      <p>
        <span className=' font-medium mr-2'>{post.author?.username}</span>
        {post.caption}
      </p>
      <span  onClick={()=>setOpen(true)} className=' cursor-pointer' >Viwe all {post.comments.length} comment</span>
      <CommentDialog open={open} setOpen={setOpen}/>
      <div className=' flex items-center '>
        <input type="text" value={text} onChange={changeEventHandler} placeholder='Add a comment.....' className=' outline-none text-sm w-full' />
        {
          text &&  <span className='text-[#3BADF8]'>Post</span>
        }
       
      </div>
  </div>
  </>
  )
}

export default Post
