import { useState } from 'react'
// import './App.css'
import Signup from './components/Signup'
import { ToastContainer } from 'react-toastify'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";import Login from './components/Login'
import Home from './components/Home'
import Mainlayout from './components/Mainlayout'
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element:<Mainlayout/>,
      children:[
        {
          path: "/profile/:id",
          element:<Profile/>
        },
        {
          path: "/account/edit",
          element:<EditProfile/>
        },
        {
          path: "/home",
          element:<Home/>
        },
      ]
    },
    {
      path: "/login",
      element:<Login/>,
    },
    {
      path: "/signup",
      element:<Signup/>,
    },
  ]);
  

  return (
    <>
    <ToastContainer
     position="top-right"
     autoClose={5000}
     hideProgressBar={false}
     newestOnTop={false}
     closeOnClick
     rtl={false}
     pauseOnFocusLoss
     draggable
     pauseOnHover
     theme="dark"/>
      <RouterProvider router={router} />
 <ToastContainer/>
    </>
  )
}

export default App
