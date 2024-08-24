import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React, { useState } from 'react'
import { Bookmark, MessageCircle, MoreHorizontal, Send } from 'lucide-react'
import { Button, } from './ui/button'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from './CommentDialog'

const Post = () => {
  const[open,setOpen] = useState(false)
  const[text,setText] = useState("")
  const changeEventHandler = (e) => {
       const inputText = e.target.value;
       if(inputText.trim()){
        setText(inputText)
       }else{
        setText("")
       }
  }
  return (
    <>
  <div className=' my-8 w-full max-w-sm mx-auto'>
      <div className=' flex items-center justify-between'>     
          <div className='items-center gap-2 flex'>
           <Avatar>
             <AvatarImage src="https://github.com/shadcn.png" className=' rounded-3xl h-12'/>
             <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1>username</h1>
      </div>
      <Dialog>
         <DialogTrigger asChild>
            <MoreHorizontal className=' cursor-pointer'/>
         </DialogTrigger>   
            <DialogContent className="flex flex-col items-center text-sm text-center">
              <Button variant="ghost" className=" cursor-pointer w-fit text-[#ED4946] font-bold" >Unfollow</Button>
              <Button variant="ghost" className=" cursor-pointer w-fit " >Add to favorites</Button>
              <Button variant="ghost" className=" cursor-pointer w-fit" >Delete</Button>
           </DialogContent>
      </Dialog>
    </div>
             <img 
              src="https://cdn.imagecomics.com/files/read/radiant-black/RadiantBlack_0101.jpeg" 
             className=' rounded-sm my-2 w-full aspect-square object-contain-cover' 
             alt="" />
       <div className=' flex items-center justify-between my-2'>
         <div className='flex items-center gap-3'>
            <FaRegHeart size={'22px'}/>
              <MessageCircle onClick={() => setOpen(true)} className='cursor-pointer hover:text-gray-600 '/>
               <Send  className=' cursor-pointer hover:text-gray-600'/>
         </div>
            <Bookmark className=' cursor-pointer hover:text-gray-600'/>
      </div>
      <span className='font-medium block md-2'>1k likes</span>
      <p>
        <span className=' font-medium mr-2'>Name</span>
         caption
      </p>
      <span  onClick={()=>setOpen(true)} className=' cursor-pointer' >Viwe all 10 comment</span>
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
