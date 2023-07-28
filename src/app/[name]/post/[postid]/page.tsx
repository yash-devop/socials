"use client"
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Heart, MessageCircle, Repeat, Send } from 'react-feather';

export default function PostPage({params}:any){
  const [postData , setPostData] = useState<any>({});
  const getPost=async()=>{
      try {
          const response = await axios.get(`/api/${params.name}/post/${params.postid}`)
          setPostData(response.data)
      } catch (error) {
         console.log(error);
      }
  }
  useEffect(()=>{
    getPost();
  },[])
  

  console.log('data',postData);
  return (
    <>
        <div className='max-w-[700px] mx-auto border-b-[1px] border-[#333232] '>
          <div className='mx-2'>
            
          <div className='flex items-center gap-3 my-4  '>
              <div className=''>
                  <img draggable={false} src={'https://pbs.twimg.com/profile_images/77846223/profile_400x400.jpg'} alt="" className='rounded-full min-w-[30px] max-w-[45px]'/>
              </div>
              <div className='w-full '>
                  <div className='flex items-center justify-between'>
                      {/* redirect to @sophiadev when click on username */}
                      <h1 className='hover:underline cursor-pointer text-lg font-semibold'>{'Sophia Johnson'}</h1>
                  </div>
              </div>
          </div>
          <div className='my-4'>
              <p className='text-[0.9rem]'>This app definitely needs hashtags or a topics feature. That’s the main thing that’s missing 😭</p>
          </div>
          <div className='flex gap-5 mb-8'>
              <Heart className='w-[22px] cursor-pointer'/>
              <MessageCircle className='w-[22px] cursor-pointer'/>
              <Repeat className='w-[22px] cursor-pointer'/>
              <Send className='w-[22px] cursor-pointer'/>
          </div>
          </div>
        </div>
    </>
  )
}
