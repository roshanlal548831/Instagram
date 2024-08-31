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


const LeftSidebar = () => {
     const navigate = useNavigate()
     const {user} = useSelector(store => store.auth);
     const dispatch = useDispatch()
    const[open,setOpen] = useState(false);
   


    const logOutHandler = async () =>{
        try {
            const res = await axios.get("/api/v1/user/logout");
            dispatch(setSelectedPost(null));
            dispatch(setPost([]));
            console.log(res.data)
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
    {icon:<MessageCircle/>,text:"Message", },
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
          sidebarItems.map((item,i) => {
              return(
                  <div onClick={() => sidebarHandler(item.text)} key={i} className='flex items-center relative gap-3 my-3 hover:bg-gray-100 cursor-pointer rounded-lg p-4 '>
                   {item.icon}
                   <span>{item.text}</span>
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
