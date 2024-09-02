import { setPost } from '@/redux/PostSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllPost = () => {
    const dipatch = useDispatch()
    useEffect(()=>{
        const fetchAllPost = async () =>{
            try {
                const res = await axios.get("/api/v1/post/all",{withCredentials:true});
                if(res.data.success){
                   dipatch(setPost(res.data.posts))
                }
            } catch (error) {
               
            }
        }
        fetchAllPost()
    },[])
}

export default useGetAllPost
