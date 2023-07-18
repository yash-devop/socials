"use client"
import Link from 'next/link'
import React ,{useState} from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {toast , Toaster} from 'react-hot-toast'
const login = () => {
  const router = useRouter();
  const [user ,setUser] = useState({
    username: "",
    password: ""
  })

  const handleLogin=async()=>{
    try {
       const response = await axios.post('/api/login',user);
       console.log(response);
       toast.success("Login Successful")
       router.push('/feed')
       
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <div className='flex flex-col pt-2 max-w-[400px] mx-auto justify-center min-h-screen'>
            <h1>Login</h1>
            <input type="text" placeholder='Enter username' name="username" id="username" className='rounded-md h-12 pl-2  mb-3 text-black outline-none' value={user.username} onChange={(e)=>setUser({...user , username:e.target.value})}/>
            <input type="text" placeholder='Enter password' name="password" id="password" className='rounded-md h-12 pl-2  text-black outline-none' value={user.password} onChange={(e)=>setUser({...user , password:e.target.value})}/>
            <button type='submit' className='p-4 border border-gray-200 max-w-[100px] mt-2 rounded-md' onClick={handleLogin}>Login</button>
            <Link href={'/signup'} className='text-blue-400'>Signup ?</Link>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    </>
  )
}

export default login