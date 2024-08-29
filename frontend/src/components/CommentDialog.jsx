import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'
import { MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import Comment from './Comment'
import { setPost } from '@/redux/PostSlice'
import axios from 'axios'
import { toast } from 'react-toastify'

const CommentDialog = ({open,setOpen}) => {
 
  const {selectedPost,posts} = useSelector(store => store.post);
  const dispatch = useDispatch();

  const[comment,setComment] = useState([])
   const[text,setText] = useState("")

  useEffect(()=>{
    if(selectedPost){
       setComment(selectedPost?.comments)
    }
  },[])

 const onchangetext = (e) =>{
  const textData = e.target.value
  if(textData.trim()){
    setText(textData)
   }else{
    setText("")
   }
     
   }
   
   const handleSubmit = async () => {
    try {
      const res = await axios.post(`/api/v1/post/${selectedPost?._id}/comment`,{text},{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      });
  
      console.log(res)
  
      if(res.data.success){
        const updatedCommentData = [...comment, res.data.comment]
        setComment(updatedCommentData)
  
      const updatedPostdate =  posts.map(p =>
         p._id === selectedPost._id ? {...p, comments:updatedCommentData } :  p
    );
  
     dispatch(setPost(updatedPostdate))
  
        toast.success(res.data.message);
        setText("")
      }
    } catch (error) {
    console.log(error)
    }
  }
  

  return (
    <Dialog open={open}>
      <DialogContent  onInteractOutside={() =>  setOpen(false)} className="max-w-5xl h-full p-0 flex-col my-2">
        <div className='flex flex-1'>
       <div className='w-1/2'>
       <img 
          src={selectedPost?.image}
          alt="CN" className='w-full h-full object-cover rounded-l-lg'/>
       </div>
          <div className='w-1/2 flex flex-col justify-between p-4'>
            <div className='flex items-center justify-between '>
                <div className='flex  gap-3 items-center '>
                <Link>
                   <Avatar>
                        <AvatarImage src={selectedPost?.author?.profilePicture} />
                        <AvatarFallback >CN</AvatarFallback>         
                    </Avatar>
               </Link>
                 <div>
                     <Link className=' font-semibold text-xs'>{selectedPost?.author?.username}</Link>
                  <span className='ml-4 text-sm'>Bio here ...</span>
                </div>
                
            </div>
            <Dialog>

            <DialogTrigger asChild>
            <MoreHorizontal className=' cursor-pointer'/>
           </DialogTrigger> 
           <DialogContent className="flex flex-col items-center text-sm text-center font-bold ">
              <div className="cursor-default w-full text-[#ED4956]">
                Unfollow
              </div>
              <div className="cursor-default w-full ">
                Add to favorites
              </div>
              <div className="cursor-default w-full ">
                Unfollow
              </div>
           </DialogContent> 
            </Dialog>
            </div>
            <hr />
            <div className='flex-1 overflow-y-auto h-full p-4 '>
             {
              comment.map((comment,i)=> <Comment key={i} comment={comment} />)
             }
            </div>
            <div className='p-4'>
               {/* <div className='flex items-center gap-2'> */}
                <div   className='flex items-center gap-2'>
                   <input value={text}  onChange={onchangetext} type="text" placeholder='Add a comment...' className='w-full outline-none border border-gray-300 p-2 rounded' />
                   <Button disabled={!text.trim()} onClick={handleSubmit} type="submit" variant="outline">Send</Button>
                </div>
               {/* </div> */}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CommentDialog
