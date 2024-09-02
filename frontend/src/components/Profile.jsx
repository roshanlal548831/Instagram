import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useGetUserProfile from './hooks/useGetUserProfile'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Heart, MessageCircle } from 'lucide-react'

const Profile = () => {
  const param = useParams();
  const userId = param.id;
  const[activetab,setactivetab] = useState('post')
  useGetUserProfile(userId);

  const {userProfile,user} = useSelector(store => store.auth);


  const isLoggedInUserProfile = user?._id === userProfile?._id
  const isFollowing = false

  const handletabChange = (tab) =>{
    setactivetab(tab)
  }
 
 const displayedPost = activetab === "posts" ? userProfile?.posts : userProfile?.bookmarks;

  return (
    <div className='flex flex-col max-w-5xl ml-72 justify-center max-autho pl-10'>
      <div className='flex flex-col gap-20 p-8'>

      </div>
      <div className='grid grid-cols-2'> 
        <section className='flex items-center justify-center'>
        <Avatar className="h-36 w-36">
          <AvatarImage src={userProfile?.profilePicture} alt="profilePicture"/>
          <AvatarFallback>CN</AvatarFallback>
       </Avatar>
        </section>
        <section>
            <div className='flex flex-col gap-5'>
              <div className='flex items-center gap-2'>
              <span>{userProfile?.username}</span>
              {
                isLoggedInUserProfile ? (
                  <>
                 <Link to="/account/edit"> <Button variant="secondary" className="hover:bg-gray-200 h-8">Edit Profile</Button></Link>
                  <Button variant="secondary" className="hover:bg-gray-200 h-8">View archive</Button>
                  <Button variant="secondary" className="hover:bg-gray-200 h-8">ad tools</Button>
                </>
                ): (
                  isFollowing ? (
                    <>
                    <Button variant="secondary" className="h-8">UnFollow</Button>
                    <Button variant="secondary" className=" h-8">Message</Button>
                    </> 
                  ):(  
                    <Button  className="bg-[#4ab2f8] hover:bg-[#2d709c] h-8">Follow</Button> 
                  )
                ) 
              }
             
              </div>
               <div className='flex gap-4'>
                   <p ><span className='font-semibold'>{userProfile?.posts.length} </span>posts</p>
                   <p ><span className='font-semibold'>{userProfile?.followers.length} </span>followers</p>
                   <p ><span className='font-semibold'>{userProfile?.following.length} </span>following</p>
               </div>
            <div className='flex flex-col gap-1'>
              <span className=' font-semibold'>{userProfile?.bio || 'bio here...'}</span>
                 <Badge variant="secondary" className="w-fit">{userProfile?.name}</Badge>
                 <span>😱 i am a student and studing</span>
                 <span>😱 i am a student and studing</span>
                 <span>😱 i am a student and studing</span>
            </div>
            </div>
        </section>
      </div>
      <div className=' border-t border-t-gray-200 mt-5'>
          <div className='flex items-center justify-center gap-10 text-sm '>
             <span onClick={()=>handletabChange("posts")} className={`py-3 cursor-pointer ${activetab === 'posts' ? "font-bold":""}`}>POSTS</span>
             <span className='py-3 cursor-pointer'>REELS</span>
             <span  onClick={()=>handletabChange("saved")} className={`py-3 cursor-pointer ${activetab === 'saved' ? "font-bold":""}`}>SAVED</span>
             <span  className='py-3 cursor-pointer'>TAGGED</span>
             
          </div>
           <div className=' grid grid-cols-3 gap-5'>
              {
                displayedPost?.map((post)=>{
                  return (
                    <div key={post?._id} className=' relative group cursor-pointer'>
                      <img src={post?.image} alt="postimage" className='rounded-sm my-2 w-full aspect-square object-cover  ' />
                       <div className=' absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                         <div className=' flex items-center text-white space-x-4'>
                            <button className="flex items-center gap-2 hover:text-gray-300">
                                 <Heart/>
                                 <span>{post.likes.length}</span>
                            </button>
                            <button className="flex items-center gap-2 hover:text-gray-300">
                                 <MessageCircle/>
                                 <span>{post.comments.length}</span>
                            </button>
                         </div>
                       </div>
                    </div>
                  )
                })
              }
           </div>
      </div>
    </div>
  )
}

export default Profile
