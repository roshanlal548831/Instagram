
import { setAuthUser } from '@/redux/AuthSlice';
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const[input,setInput] = useState({
       
        username:"",
        password:"",
    });

   const[loading,setLoading] = useState(false);

   const Signup = (e) =>{
    const name = e.target.name
    const value = e.target.value
    setInput({
        ...input,[name]:value
     })
   };

   const Singuphandler = async(e) =>{
     e.preventDefault();
    try {
      
        if(input.username.length < 1 || input.password.length < 1 ){
            toast("fill the all input")
        }else{
            setLoading(true)
            const res = await axios.post("/api/v1/user/login",input,)
            console.log(res.data)
            if(res.data.success){
             toast.success(res.data.message)
             setInput({
                username:"",
                password:"",
            })
            console.log("user data",res.data.users)
            dispatch(setAuthUser(res.data.users))
            navigate("/")
            } 
        }
      

    } catch (error) {
    // setLoading(true)
    // setLoading(true)
    console.log(error)
    toast.error(error.response.data.message)

    }finally{
        setLoading(false)
       }

   } 

  return (
    <>
    
      <section className="bg-gray-50 dark:bg-blue-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-10 h-10 rounded-lg mr-2" src="https://www.shutterstock.com/shutterstock/photos/346194287/display_1500/stock-vector-connection-icon-346194287.jpg" alt="logo"/>
         User
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
               
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={Singuphandler}>
                 
              

                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                      <input type="text" value={input.username} onChange={Signup} name="username" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your username..." />
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" value={input.password} onChange={Signup} name="password" id="password" placeholder="Enter your password..." className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                  <button type="submit"
                        className="inline-flex w-full bg-slate-800 items-center justify-center rounded-lg border bg-grey p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 
                        disabled:bg-gray-400">
                      {loading ? 
                     <div role="status">
                         <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                             <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                         </svg>
                         <span className="sr-only">Loading...</span>
                     </div>
                     :  "Continue"}

                    </button>
                      <span>Dosent have an account? <Link to="/signup" className='text-sky-600 underline'>Signup</Link></span>
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                     
                      </div>
                  
                  </div>
                
              </form>
          </div>
      </div>
  </div>
</section>
    </>
  )
}

export default login
