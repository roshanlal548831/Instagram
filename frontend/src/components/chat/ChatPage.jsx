import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { setSelectedUser } from '@/redux/AuthSlice';
import { Button } from '../ui/button';
import { MessageCircle } from 'lucide-react';
import Messages from './Messages';
import axios from 'axios';
import { setMessages } from '@/redux/ChatSlice';
import { Link } from 'react-router-dom';

const ChatPage = () => {
    const[textMessage,setTextMessage] = useState("");
    const dispatch = useDispatch()

    const {user,suggestedUsers,selectedUser} = useSelector(store => store.auth);
    const {onlineUser,message} = useSelector(store => store.chat);
   
const sendMessageHandler = async(receiverId) => {
    try {
       const res = await axios.post(`/api/v1/message/send/${receiverId}`,{textMessage},{
        headers:{
          "Content-Type": "application/json"
        },
        withCredentials: true
       });
       if(res.data.success){
        dispatch(setMessages([...message,res.data.newMessage]));
        setTextMessage("")
       }
    } catch (error) {
     
      
    }
};

useEffect(()=>{
  return () => {
    dispatch(setSelectedUser(null));
  }
},[])
 
  return (
    <div className='flex ml-[16%] h-screen'>
        <section className='w-full md:w-1/4 my-8'>
            <h1 className='font-bold mb-4 px-3 text-xl'>{user?.name}</h1>
            <hr className='mb-4 border-gray-300' />
            <div className='overflow-y-auto h-[80vh]'>
        {
           suggestedUsers?.map((suggestedUser)=>{
            const isOnline = onlineUser.includes(suggestedUser?._id)
            return (
                <div onClick={()=> dispatch(setSelectedUser(suggestedUser))} className='flex gap-3 items-center p-3 hover:bg-gray-50 cursor-pointer'>
                     <Avatar className="w-14 h-14">
                        <AvatarImage src={suggestedUser?.profilePicture} />
                        <AvatarFallback>CN</AvatarFallback>
                     </Avatar>
                     <div className='flex flex-col'>
                        <span className='font-medium'>{suggestedUser?.name}</span>
                         <span className={`text-xm ${isOnline ? "text-green-600": "text-red-600"}`}>{isOnline? "online":"offline"}</span>
                     </div>
                </div>
            )
           })
        }
            </div>
        </section> 
        {
            selectedUser? (
             <section className='flex-1 border-l border-l-gray-300 flex  flex-col h-full'>
                    <div className='flex gap-3 items-center px-3 py-2 border-b border-gray-300 sticky top-0 bg-white z-10'>
                      <Link to={`/profile/${user?._id}`}>
                      <Avatar>
                            <AvatarImage src={selectedUser?.profilePicture} alt="profile pic"/>
                            <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      </Link>
                    <div className='flex flex-col'>
                        <span>{selectedUser?.username}</span>
                     </div>
                    </div>
                  <Messages selectedUser={selectedUser}/>
                    <form onSubmit={()=>sendMessageHandler(selectedUser?._id)} className='flex items-center p-4 border-t border-t-gray-300 '>
                    <input type='text' value={textMessage} onChange={(e) => setTextMessage(e.target.value)} className='flex-1 h-10 p-4  mr-2 focus-visible:ring-transparent' placeholder='messages...'/>
                    <Button type="submit">Send</Button>
                    </form>  
  
             </section>
            ) : (
            <div className='flex flex-col items-center justify-center mx-auto'>
                 <MessageCircle className='w-32 h-32 my-4'/>   
                 <h1 className='font-bold'>Your messages</h1>
                 <span>Send a message to start chat</span>
            </div>
            )
        }
    </div>
  )
}

export default ChatPage
