"use client"
import {Image} from 'react-feather'
import React, { useEffect, useState } from 'react'
import Thread from '../thread/page'
import axios from 'axios'

const feed = () => {
  const [threads,setThreads] = useState();
  const [threadBody,setThreadBody] = useState({
     body: "",
     thread_pic:"https://pbs.twimg.com/profile_images/77846223/profile_400x400.jpg"
  });
  // console.log(threadBody);
  
  const getThreads=async(e: React.SyntheticEvent)=>{
     e.preventDefault();
     try {
        const response = await axios.post("/api/thread",threadBody)
        console.log(response);
     } catch (err) {
        console.log(err);
     }
  }
  return (
    <div className='max-w-[750px] mx-auto'>

        <div className='p-4 mx-auto'>
          <form action="" onSubmit={getThreads}>
            <textarea required className=' w-full bg-[#484848] p-4 rounded-lg outline-none' name="body" id="" placeholder='Say Something...' value={threadBody.body} onChange={(e)=>setThreadBody({...threadBody , body : e.target.value})}></textarea>
          
            <div className='flex justify-between items-center pt-2'>
                <Image width={24}/>
                <input type="submit" value="Post" className='bg-white text-black py-2 px-4 border border-black rounded text-sm ' />
            </div>
          
          </form>
        </div>
        <Thread />                
        <Thread />                
        <Thread />                
        {/* {
            threads&& threads.map((curElem)=>{
                return(
                    <>
                        <Thread key={curElem.$id} {...curElem}/>                
                    </>
                )
            })
        } */}
    </div>
  )
}

export default feed