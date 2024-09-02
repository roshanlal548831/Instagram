import { setAuthUser } from '@/redux/AuthSlice';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import axios from 'axios';
import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CreatePost from './CreatePost';
import { setPost, setSelectedPost } from '@/redux/PostSlice';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { FaFacebookMessenger } from "react-icons/fa6"


const LeftSidebar = () => {
     const navigate = useNavigate()
     const {likeNotification} = useSelector(store => store.realTimeNotification);
     const {user} = useSelector(store => store.auth);
     const dispatch = useDispatch()
    const[open,setOpen] = useState(false);
   


    const logOutHandler = async () =>{
        try {
            const res = await axios.get("/api/v1/user/logout");
            dispatch(setSelectedPost(null));
            dispatch(setPost([]));
            if(res.data.success){
           dispatch(setAuthUser(null))
           navigate("/login");
           toast.success(res.data.message)
            };
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    

   const sidebarHandler = (texttype) =>{
       if(texttype === "Logout"){
        logOutHandler()
       }else if(texttype === "Create"){
          setOpen(true)
       }else if(texttype === "Profile"){
         navigate(`profile/${user?._id}`)
       }else if(texttype === "Home"){
        navigate('/home')
       }else if(texttype === "Message"){
        navigate("/chat")
       }
   };
   const sidebarItems = [
    {icon:<Home/>,text:"Home", },
    {icon:<Search/>,text:"Search", },
    {icon:<TrendingUp/>,text:"Explore", },
    {icon:<FaFacebookMessenger className='h-6 w-6'/>,text:"Message", },
    {icon:<Heart/>,text:"Notification", },
    {icon:<PlusSquare/>,text:"Create", },
    {icon:(
        <Avatar>
          <AvatarImage src={user?.profilePicture} className=' rounded-3xl h-7 w-7'/>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    ),text:"Profile", },
    {icon:<LogOut/>,text:"Logout", },

]
  return (
    
    <div className='fixed top-8 z-10 left-0 px-4 border-r border-gray:300 w-[16%] h-screen '>
        <div className='flex flex-col'>
            <div>

     <h1 className='my-8 pl-3 font-bold'>LOGO</h1>
      {
          sidebarItems?.map((item,i) => {
              return(
                  <div onClick={() => sidebarHandler(item.text)} key={i} className='flex items-center relative gap-3 my-3 hover:bg-gray-100 cursor-pointer rounded-lg p-4'>
                   {item.icon}
                   <span>{item.text}</span>
                   {
                       item.text === "Notification" && likeNotification?.length > 0 && (
                        <Popover>
                            <PopoverTrigger asChild>
                                    <Button size="icone" className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-600 absolute bottom-6 left-6">{likeNotification.length}</Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                 <div>

                                    {
                                        likeNotification.length === 0 ? (<p>No new Notification</p>) : (
                                            likeNotification?.map((notification)=>{
                                                return(
                                                    <div key={notification?.userId} className='flex items-center gap-2'>
                                                          <Avatar>
                                                             <AvatarImage src={notification.userDetails?.profilePicture} className=" rounded-full h-8 w-8"/>
                                                             <AvatarFallback>CN</AvatarFallback>
                                                          </Avatar>
                                                          <p className='text-sm'><span className='font-bold'>{notification.userDetails?.username} </span>liked your post</p>
                                                    </div>
                                                )
                                            })
                                        )
                                    }
                                 </div>
                            </PopoverContent>
                        </Popover>
                       )
                   }
               </div>
            )
        })
    }
      </div>
     </div>
     <CreatePost open={open} setOpen={setOpen}/>
    </div>
  )
}

export default LeftSidebar
