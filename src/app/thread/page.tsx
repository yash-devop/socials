"use client"
import React, { useEffect, useMemo, useState } from 'react'
import {MoreHorizontal,Heart,Repeat,Send,MessageCircle} from 'react-feather'
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import Link from 'next/link'
import axios from 'axios'
// import en from 'javascript-time-ago/locale/en.json'
import jwt from 'jsonwebtoken';

const Thread = (curElem:any) => {
    console.log('curELeme',curElem);
    const [userData , setUserData] = useState<any>({})
    // const getUsername=async()=>{
    //     try {
    //         const response = await axios.get('/api/getuser');
    //         setUserData(response.data);
            
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    
    // useEffect(()=>{
    //     getUsername();
    // },[])
    // console.log('userdata',userData);
  return (
    <>
        <div className='flex gap-3 my-4 mx-3.5 border-b-[1px] border-[#333232]'>
            <div className='bg-red pt-4'>
                <img src={'https://pbs.twimg.com/profile_images/77846223/profile_400x400.jpg'} alt="" className='rounded-full min-w-[30px] max-w-[45px]'/>
            </div>
            <div className='w-full'>
                <div className='flex items-center justify-between'>
                    <h1 className='hover:underline cursor-pointer text-lg font-semibold'><Link href={`/@${userData.username}`}>{curElem.username}</Link></h1>
                    <div className='flex'>
                        <p className='text-[rgba(97,97,97,1)] mr-3'>3 hr ago</p>
                        <MoreHorizontal className=''/>
                    </div>
                </div>
                <p className='pt-1 font-light'>{curElem.body}</p>
                <div className='flex gap-5 py-4'>
                    <Heart className='w-[22px]'/>
                    <MessageCircle className='w-[22px]'/>
                    <Repeat className='w-[22px]'/>
                    <Send className='w-[22px]'/>
                </div>
                <div className='text-[rgba(97,97,97,1)] pb-4 flex'>
                    <p>24,475 replies</p>
                    <p className='px-3'>·</p>
                    <p>127,883 likes</p>
                </div>
            </div>
        </div>
    </>
  )
}


export default Thread