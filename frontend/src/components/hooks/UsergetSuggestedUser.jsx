import { setSuggestedUsers } from '@/redux/AuthSlice'
import axios from 'axios'
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const UsergetSuggestedUser = () => {
    const dipatch = useDispatch()
    useEffect(()=>{
        const fetchSuggestedUser = async () =>{
            try {
                const res = await axios.get("/api/v1/user/suggested",{withCredentials:true});
                if(res.data.success){
                   dipatch(setSuggestedUsers(res.data.users))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchSuggestedUser()
    },[])
}

export default UsergetSuggestedUser
