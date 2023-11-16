"use client"
import Image from 'next/image'
import { NextRequest } from 'next/server'
import React, { useEffect ,useState} from 'react'
import dummyIcon from '@/assets/alex.jpg'
import jackIcon from '@/assets/jack.jpg'
import Home from '@/assets/home.svg'
import ThreadBar from '@/components/ThreadBar'
import Link from 'next/link'

const getThreads=async()=>{
    const data = await fetch("http://localhost:3000/api/home")
    const threads = await data.json();
    console.log('dataa', threads);
    return threads;
}
const page = () => {
    
    const [threadBody , setThreadBody] = useState({
        body: ""
    });
    const postThreads=async()=>{
        const data = await fetch("http://localhost:3000/api/threads",{
            method: "POST",
            body : JSON.stringify(threadBody),
            headers:{
                "Content-Type": "application/json"
            }
        })
        console.log('dataPOST',data);
    }
    useEffect(()=>{
        getThreads()
    },[])
    return (
    <>
        <div className='mt-[80px] h-full w-full pb-4 flex flex-col gap-3 px-2'>
            {/* <ThreadBar /> */}
            <div className='w-full md:max-w-[600px] mx-auto flex gap-2 mb-4 items-center justify-center border-b border-[#414141] pb-2'>
               <Image src={dummyIcon} alt='thread-ico' className='w-10 h-10 rounded-full'/>
               <div className='w-full bg-transparent placeholder:text-[#575757] outline-none border-none'>
                  <input value={threadBody.body} onChange={(e)=>setThreadBody({...threadBody , body: e.target.value})} type="text" placeholder='Start Thread' className='w-full bg-transparent placeholder:text-[#575757] outline-none border-none'/>
               </div>
            <button onClick={postThreads} className='rounded-full px-4 py-1.5 bg-[#414141] w-[80px] text-black'>Post</button>
        </div>
            <div className='w-full md:max-w-[600px] mx-auto flex flex-col gap-1.5 cursor-pointer border-b pb-9 border-[#222222]'>
                <div className='flex w-full gap-2'>
                    <div className='rounded-full w-10 h-10'>
                        <Image src={dummyIcon} alt='image' className='rounded-full object-cover w-full h-full'/>
                    </div>
                    <div className='flex flex-col items-center w-full justify-center pb-2'>
                        <div className='flex w-full justify-between items-center'>
                            <Link href={`/yash`} className='font-bold hover:underline text-[15px] md:text-base cursor-pointer'>TrakinTech</Link>
                            <p className='text-[#575757]'>2h</p>
                        </div>
                    </div>
                </div>

                <div className={`flex flex-col ml-4 w-full gap-2 border-l border-[#3d3d3d] pl-6`}>
                    <p className='font-normal text-sm md:text-[14.6px] cursor-pointer '>Thinking of doing a build with me series on my insta/tiktok. Where I’ll take you guys through how I build projects etc 🤔</p>
                    <Image src={dummyIcon} alt='image' className='rounded-lg object-contain w-[340px] sm:w-[350px] md:w-[450px] lg:w-[500px] h-full'/>
                    <div className='flex gap-2'>
                        <div className='flex gap-4'>
                            <div className='group '>
                                <div className='group-hover:bg-[#252525ab] w-[35px] h-[35px] rounded-full flex items-center justify-center'> 
                                    <svg fill="#D02735" className={`text-[#D02735]`} viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2"  strokeLinecap="round" strokeLinejoin="round" ><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-4'>
                            <div className='group '>
                                <div className='group-hover:bg-[#252525ab] w-[35px] h-[35px] rounded-full flex items-center justify-center'>
                                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" className="css-i6dzq1"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                                </div>
                            </div>
                        </div>
                        
                        <div className='flex gap-4'>
                            <div className='group '>
                                <div className='group-hover:bg-[#252525ab] w-[35px] h-[35px]  rounded-full flex items-center justify-center'>
                                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" className="css-i6dzq1"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-4'>
                            <div className='group '>
                                <div className='group-hover:bg-[#252525ab] w-[35px] h-[35px] rounded-full flex items-center justify-center'> 
                                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" className=""><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                    <div className='text-[#575757] flex items-center gap-2 text-sm ml-10'>
                        <p className='hover:underline'>275 replies</p>
                        ·
                        <p className='hover:underline'>9911 likes</p>
                    </div>
            
            </div>   
   
        </div>
    </>
  )
}

export default page

