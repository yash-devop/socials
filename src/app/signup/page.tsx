"use client"
import axios from 'axios';
import React, { useState ,useEffect} from 'react'
import Link from 'next/link'; 'next/link'

  
const signup = () => {
    const [user ,setUser] = useState({
        username: "",
        password: ""
    })

    const handleSubmit=async()=>{
        try {
            axios.post('/api/signup',user)
            
        } catch (err) {
            console.log(err)
        }
    }
  
  return (
    <>
        <div className='flex flex-col pt-2 max-w-[400px] mx-auto justify-center min-h-screen'>
            <h1>Signup</h1>
            <input type="text" placeholder='Enter username' name="username" id="username" className='rounded-md h-12 pl-2  mb-3 text-black outline-none' value={user.username} onChange={(e)=>setUser({...user , username:e.target.value})}/>
            <input type="text" placeholder='Enter password' name="password" id="username" className='rounded-md h-12 pl-2  text-black outline-none' value={user.password} onChange={(e)=>setUser({...user , password:e.target.value})}/>
            <button type='submit' className='p-4 border border-gray-200 max-w-[100px] mt-2 rounded-md' onClick={handleSubmit}>Signup</button>
            <Link href={'/login'} className='text-blue-400'>Signin ?</Link>
        </div>
    </>
  )
}

export default signup