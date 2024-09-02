import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useGetAllMessage from '../hooks/useGetAllMessage'
import UseRTM from '../hooks/UseRTM'

const Messages = ({selectedUser}) => {
  UseRTM()
useGetAllMessage()
const {message} = useSelector(store => store.chat);



  return (
    <div className='overflow-y-auto flex-1 p-4'>
        <div className='flex justify-center flex-col items-center'>
        <Link to={`/profile/${selectedUser._id}`}>
            <Avatar className="h-20 w-20">
                <AvatarImage src={selectedUser?.profilePicture} alt="profile"/>
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            </Link>
            <Link to={`/profile/${selectedUser._id}`}>
          <span>{selectedUser?.name}</span>
          </Link>
          <Link to={`/profile/${selectedUser._id}`}><Button variant="secondary" className="h-8 my-2">View profile</Button></Link>
        </div>
        <div className=' flex flex-col gap-3'>
      { 
    message && message?.map((msg) => {
           return(
            <div className={`flex ${msg.senderId === selectedUser?._id ? "justify-start":"justify-end"}`} >
                  <div className={`p-1 rounded-2xl scroll-smooth   max-w-xs break-words ${msg.senderId === selectedUser?._id ? "bg-gray-200": "bg-[#0084ff] text-white "}`}>
                    {msg.message}
                  </div>
            </div>
           )
       })
       }
       </div>
    </div>
  )
}

export default Messages
