import { setMessages } from '@/redux/ChatSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const UseRTM = () => {
    const dipatch = useDispatch();
    const{socket} = useSelector(store => store.socketio)
    const {message} = useSelector(store => store.chat)

    useEffect(()=>{
       socket?.on("newMessage",(newMessage)=> {
          dipatch(setMessages([...message,newMessage]));
       })
       return()=>{
        socket?.off()
       }
    },[message,setMessages])
}

export default UseRTM













