import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import Home from './Home'
import LeftSidebar from './LeftSidebar'

const Mainlayout = () => {
  return (
    <>
    <LeftSidebar/>
    <div>  
      <h1> Side bar </h1>
      <Outlet/>
    </div>
    </>
  )
}

export default Mainlayout
