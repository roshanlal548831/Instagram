import { useEffect, useState } from 'react'
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
import ChatPage from './components/chat/ChatPage';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { setSocket } from './redux/SocketSlice';
import { setOnlineUsers } from './redux/ChatSlice';


function App() {
  const dispatch = useDispatch();
  const {socket} = useSelector(store => store.socketio)
  
  const {user} = useSelector(store => store.auth)

  useEffect(()=>{
      if(user){
           const socketio = io("http://localhost:8000",{
            query:{
              userId:user?._id
            },
            transports:["websocket"]
           });
        dispatch(setSocket(socketio));

        // listen all the event

        socketio.on("getOnlineUsers",(onlineUser)=>{
          dispatch(setOnlineUsers(onlineUser))
        });
        return () => {
          socketio.close()
          dispatch(setSocket(null));
        }
      }else if (socket){
        socket?.close()
        dispatch(setSocket(null));
      }
  },[user,dispatch])

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
          path: "/chat",
          element:<ChatPage/>
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
