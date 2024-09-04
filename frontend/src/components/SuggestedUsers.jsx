import React from 'react'
import { useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link } from 'react-router-dom';

const SuggestedUsers = () => {
  const {suggestedUsers} = useSelector(store => store.auth) ;
  return (
    <div className='my-10 w-96'>
      <div className='flex items-center justify-between text-sm' >
         <h1 className=' font-semibold text-gray-600'>Suggested for you</h1>
         <span className='font-medium cursor-pointer'>See All</span>
      </div>
      {
        suggestedUsers?.map((user)=>{
          return(
            <div key={user._id} className='flex items-center justify-between my-5 w-96'>
              <div className='items-center gap-2 flex'>
                  <Link to={`/profile/${user._id}`}>
                  <Avatar>
                       <AvatarImage src={user?.profilePicture} className=' rounded-3xl h-12 w-12'/>
                       <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </Link>
               <div >
                   <h1 className=' font-semibold'><Link to={`/profile/${user._id}`}>{user?.username}</Link></h1>
                   <span className='text-gray-600 text-sm'>{user?.bio || 'Bio here...'}</span>
               </div>
               </div>
               <span className='text-[#3BADF8] text-sm font-bold cursor-pointer hover:text-[#33719a]'>Follow</span>
            </div>
          )
        })
      }
    </div>
  )
}

export default SuggestedUsers
