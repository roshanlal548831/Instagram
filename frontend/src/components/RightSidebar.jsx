import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import SuggestedUsers from './SuggestedUsers';

const RightSidebar = () => {
  const {user} = useSelector(store => store.auth);
  return (
    <div className='w-fit my-10 pr-36'>
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
     <SuggestedUsers />
    </div>
  )
}

export default RightSidebar
