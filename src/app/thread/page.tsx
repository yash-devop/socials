"use client"
import React from 'react'
import {MoreHorizontal,Heart,Repeat,Send,MessageCircle} from 'react-feather'
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
// import en from 'javascript-time-ago/locale/en.json'

const Thread = () => {
  return (
    <>
        <div className='flex gap-3 my-4 mx-3.5 border-b-[1px] border-[#333232]'>
            <div className='bg-red pt-2'>
                <img src={'https://pbs.twimg.com/profile_images/77846223/profile_400x400.jpg'} alt="" className='rounded-full min-w-[30px] max-w-[45px]'/>
            </div>
            <div className='w-full'>
                <div className='flex items-center justify-between'>
                    <h1 className='hover:underline cursor-pointer'>{'Zuck'}</h1>
                    <div className='flex'>
                        <p className='text-[rgba(97,97,97,1)] mr-3'>3 hr ago</p>
                        <MoreHorizontal className=''/>
                    </div>
                </div>
                <p className='pt-1.5'>{"hey threreererere"}</p>
                <div className='flex gap-5 py-4'>
                    <Heart className=''/>
                    <MessageCircle className=''/>
                    <Repeat className=''/>
                    <Send className=''/>
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