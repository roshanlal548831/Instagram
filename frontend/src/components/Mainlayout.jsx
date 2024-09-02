import React from 'react'
import { Outlet } from 'react-router-dom'
import Home from './Home'
import LeftSidebar from './LeftSidebar'

const Mainlayout = () => {
  return (
    <>
    <LeftSidebar/>
    <div>  
      <Outlet/>
    </div>
    </>
  )
}

export default Mainlayout
