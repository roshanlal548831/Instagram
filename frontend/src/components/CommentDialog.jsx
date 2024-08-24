import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'
import { MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'

const CommentDialog = ({open,setOpen}) => {
   const[text,setText] = useState("")


   const onchangetext = (e) =>{
  const textData = e.target.value
      setText(textData)
   }

   const handleSubmit = (e) =>{
     e.preventDefault();
     console.log(text)
   }
  return (
    <Dialog open={open}>
      <DialogContent  onInteractOutside={() =>  setOpen(false)} className="max-w-5xl h-full p-0 flex-col my-2">
        <div className='flex flex-1'>
       <div className='w-1/2'>
       <img 
          src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="" className='w-full h-full object-cover rounded-l-lg'/>
       </div>
          <div className='w-1/2 flex flex-col justify-between p-4'>
            <div className='flex items-center justify-between '>
                <div className='flex gap-3 items-center'>
                <Link>
                   <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback >CN</AvatarFallback>         
                    </Avatar>
               </Link>
                 <div>
                     <Link className=' font-semibold text-xs'> Username</Link>
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
              <h1> Comment ayenge</h1>
            </div>
            <div className='p-4'>
               {/* <div className='flex items-center gap-2'> */}
                <form  onSubmit={handleSubmit} className='flex items-center gap-2'>
                   <input value={text}  onChange={onchangetext} type="text" placeholder='Add a comment...' className='w-full outline-none border border-gray-300 p-2 rounded' />
                   <Button type="submit" variant="outline">Send</Button>
                </form>
               {/* </div> */}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CommentDialog
