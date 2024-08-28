import React from 'react'
import Mainlayout from './Mainlayout'
import Feed from './Feed'
import { Outlet } from 'react-router-dom'
import RightSidebar from './RightSidebar'

const Home = () => {

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
