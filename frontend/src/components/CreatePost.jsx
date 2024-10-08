import React, { useRef, useState } from 'react'
import { Dialog, DialogContent, DialogHeader } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { readFileAsDataURL } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { setPost } from '@/redux/PostSlice';


const CreatePost = ({open, setOpen}) => {
  const dipatch = useDispatch();
  const {posts} = useSelector((store) => store.post)
  const {user} = useSelector((store) => store.auth);
   const imgaRef = useRef()
   const[file,setFile] = useState("");
   const[caption,setCaption] = useState("");
   const[imagePriview,setImagePrivew] = useState("");
   const[loading,setLoading] = useState(false)


  const fileChangehandler = async(e) => {
    const file =  e.target.files?.[0];
     if(file){
      setFile(file);
      const dataUrl = await readFileAsDataURL(file);
      setImagePrivew(dataUrl);
     };
  };

  const createPostHandler = async (e) => {
    e.preventDefault();
    const formData =  new FormData()
    formData.append("caption",caption);
    if(imagePriview) formData.append("image",file)
     try {
    setLoading(true)
    const res = await axios.post("/api/v1/post/addpost",formData,{
      headers:{
        "Content-Type": "multipart/form-data"
      }
    });
    if(res.data.success){
      dipatch(setPost([res.data.post,...posts]))
      setOpen(false);
      setFile("")
      setCaption(""),

      toast.success(res.data.message)
    }
     } catch (error) {
      toast.error(error.response.data.message)
     }finally{
      setLoading(false)
     }
  }
  return (
   <>
    <Dialog open={open}>
       <DialogContent onInteractOutside={() => setOpen(false)}>
        <DialogHeader className="text-center font-bold">Create new Post</DialogHeader>
        <div className='flex gap-3 items-center'>
         <Avatar>
             <AvatarImage src={user?.profilePicture} alt="img"></AvatarImage>
               <AvatarFallback>CN</AvatarFallback>
         </Avatar>
           <div>
               <h1 className=' font-semibold text-xs'>{user?.username}</h1>
               <span className='text-gray-600 font-xs gap-3'>Bio here...</span>
           </div>
        </div>
         <Textarea type="text" className=" focus-visible:ring-transparent border-none" value={caption} onChange={(e) => setCaption(e.target.value )} placeholder="Write a caption"/>
         {
          imagePriview && (
            <div className='w-full min-h-96 flex items-center justify-center '>
               <img src={imagePriview} alt="priviewImgae" className=' rounded-md object-cover h-96 w-full'/>
            </div>
          )
         }
         <input  ref={imgaRef}  type="file" className=' hidden' onChange={fileChangehandler}/>
         <Button onClick={()=> imgaRef.current.click()} className='w-fit mx-auto bg-[#0095F6] hover:bg-[#66c2da54]'>Select from computer</Button>
          {
            imagePriview && (
              loading ? (<Button>
                <Loader2 className='mr- h w-4 animate-spin'/>
                Plese wait
              </Button>) : (
                <Button onClick={createPostHandler} type="submit" className="w-full">Post</Button>
              )
            )
          }
       
       </DialogContent>
    </Dialog>
   </>
  )
}

export default CreatePost
