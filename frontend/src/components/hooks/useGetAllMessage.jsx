import { setMessages } from '@/redux/ChatSlice'
import { setPost } from '@/redux/PostSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllMessage = () => {
    const dipatch = useDispatch();
    const {selectedUser} = useSelector(store => store.auth);
    useEffect(()=>{
        const fetchAllMessage = async () =>{
            try {
                const res = await axios.get(`/api/v1/message/all/${selectedUser?._id}`,{withCredentials:true});
               
                if(res.data.success){
                   dipatch(setMessages(res.data.message))
                }
            } catch (error) {
               
            }
        }
        fetchAllMessage()
    },[selectedUser])
}

export default useGetAllMessage













