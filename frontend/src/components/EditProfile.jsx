import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import axios from 'axios';
import { Loader, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setAuthUser } from '@/redux/AuthSlice';

const EditProfile = () => {
  const {user}  =  useSelector(store => store.auth);
    const imageRef = useRef();
    const [loading,setLoading] = useState(false);
    const[input,setInput] = useState({
    profilePicture: user?.profilePicture,
    bio: user?.bio,
    gender:user?.gender
          
    });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fileChangehandler = (e) => {
    const file = e.target.files?.[0]
    if(file)setInput({...input,profilePicture:file});
  };

  const selectChangeHandler = (value) => {
          setInput({...input,gender:value});
  }

    const editProfileHandler = async() => {      
      const formData = new FormData();
      formData.append("bio",input.bio)
      formData.append("gender",input.gender)
      if(input.profilePicture){
        formData.append("profilePhoto",input.profilePicture)
      }
        try {
          setLoading(true);
          const res = await axios.post("/api/v1/user/profile/edit",formData,{
            headers:{
              "Content-Type": "multipart/form-data"
            },
            withCredentials:true
          });
          if(res.data.success){
            const upDatedUserData = {
              ...user,
              bio:res.data.user?.bio,
              profilePicture:res?.data.user?.profilePicture,
              gender: res.data.user?.gender
            };
            dispatch(setAuthUser(upDatedUserData))
             navigate(`/profile/${user._id}`)
            toast.success(res.data.message);
          }
        } catch (error) {
          toast.error(error.response.data.message)
        }finally{
          setLoading(false)
        }
    }

  return (
    <div className='flex max-w-2xl mx-auto pl-10'>
      <section className='flex flex-col gap-6 w-full my-8'>
           <h1 className=' font-bold text-xl '>Edit Profile</h1>
           <div className='items-center justify-between gap-2 flex bg-gray-100 rounded-xl p-4'>
            <div className='flex items-center gap-3'>
            <Avatar>
                    <AvatarImage src={user?.profilePicture} className=' rounded-3xl h-12 w-12'/>
                    <AvatarFallback>CN</AvatarFallback>
                 </Avatar>
            <div >
                <h1 className=' font-semibold text-sm'></h1>
                <span className='text-gray-600 text-sm'>{user?.bio || 'Bio here...'}</span>3
            </div>
            </div>
              <input ref={imageRef}  onChange={fileChangehandler} type="file" className='hidden'  />
              <Button onClick={()=>imageRef?.current.click()} className="bg-[#0095F6] hover:bg-[#3e88dd]">Change Photo</Button>
            </div>
            <div className='w-full '>
                 <h1 className='font-bold text-xl'>Bio</h1>
                 <textarea value={input.bio} onChange={(e) => setInput({...input,bio:e.target.value})} name="bio" id="" variant="secondary" className='focus-visible:ring-slate-500 border rounded-lg w-full'/>
            </div>
              <div>
                   <h1 className='font-bold mb-2'>Gender</h1>
                   <Select defaultValue={input.gender} onValueChange={selectChangeHandler}>
                           <SelectTrigger className="w-full">
                             <SelectValue  />
                           </SelectTrigger>
                           <SelectContent>
                             <SelectGroup>
                               <SelectItem value="male">Male</SelectItem>
                               <SelectItem value="female">Female</SelectItem>
                             </SelectGroup>
                           </SelectContent>
                      </Select>
                  </div>
                  <div className='flex justify-end'>
                    {
                      loading ?( <Button className="w-fit bg-[#0095F6] hover:bg-[#2e56a7]">
                        <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
                        Please wait
                        </Button>
                        ) : (
                          <Button onClick={editProfileHandler} className="w-fit bg-[#0095F6] hover:bg-[#2e56a7]">Submit</Button>
                        )

                    }
                  </div>
      </section>
    </div>
  )
}

export default EditProfile
