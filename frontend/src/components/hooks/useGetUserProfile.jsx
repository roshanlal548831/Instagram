import { setSuggestedUsers, setUserProfile } from '@/redux/AuthSlice'
import axios from 'axios'
import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetUserProfile = (userId) => {
    const dipatch = useDispatch();
    useEffect(()=>{
        const fetchUserProfile = async () =>{
            try {
                const res = await axios.get(`/api/v1/user/${userId}/profile`,{withCredentials:true});
                if(res.data.success){
                   dipatch(setUserProfile(res.data.user))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchUserProfile()
    },[userId])
}

export default useGetUserProfile
