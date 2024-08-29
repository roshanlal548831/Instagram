import React from 'react'
import Mainlayout from './Mainlayout'
import Feed from './Feed'
import { Outlet } from 'react-router-dom'
import RightSidebar from './RightSidebar'
import useGetAllPost from './hooks/useGetAllPost'
import UsergetSuggestedUser from './hooks/UsergetSuggestedUser'

const Home = () => {
     useGetAllPost();
     UsergetSuggestedUser();
  return (
    <div className='flex'>
      <div className='flex justify-center flex-grow'>
      <Feed/>
       <Outlet/>
      </div>
      <RightSidebar/>
    </div>
    
  )
}

export default Home
