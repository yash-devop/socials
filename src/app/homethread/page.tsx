"use client"
import React, { useEffect, useMemo, useState } from 'react'
import {MoreHorizontal,Heart,Repeat,Send,MessageCircle} from 'react-feather'
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import Link from 'next/link'
import axios from 'axios'
import Image from 'next/image'
import extractLink from '@/helpers/extractLink'
// import en from 'javascript-time-ago/locale/en.json'


const HomeThread = (curElem:any) => {
   console.log('curelmAYA',curElem);
  const textLink = extractLink(curElem._doc.body);

//   console.log("6th data " , curElem[6]);
  return (
    <>
        <div className='flex gap-3 my-4 mx-3.5 border-b-[1px] border-[#333232]'>
            <div className='pt-4'>
                {
                    curElem.owner_id.profilepic && Object.getOwnPropertyNames(curElem.owner_id.profilepic).length > 0  ? (
                        
                        <Image src={curElem.owner_id.profilepic.url} className='rounded-full min-w-[45px] min-h-[45px] object-cover' draggable={false}
                            alt="profile-pic"
                            width={45}
                            height={0}
                            sizes="100vw"
                        />
                    ) : (
                        <Image src={'https://pbs.twimg.com/profile_images/77846223/profile_400x400.jpg'} className='rounded-full min-w-[45px] min-h-[45px] object-cover' draggable={false}
                        alt="profile-pic"
                        width={45}
                        height={0}
                        sizes="100vw"
                        />
                    )
                }
            </div>
            <div className='w-full'>
                <div className='flex items-center justify-between'>
                    <h1 className='hover:underline cursor-pointer text-lg font-semibold'><Link href={`/@${curElem.owner_id.username}`}>{curElem.owner_id.username}</Link></h1>
                    <div className='flex'>
                        <p className='text-[rgba(97,97,97,1)] mr-3'>3 hr ago</p>
                        <MoreHorizontal className=''/>
                    </div>
                </div>
                <p className='mb-3'>
                        {textLink === "" || textLink === null ? "" : curElem._doc.body.split(textLink)[0]}
                        {textLink === "" || textLink === null ? curElem._doc.body : <a href={textLink} target="_blank" rel="noopener noreferrer" className='text-blue-400'>{textLink}</a>}
                        {textLink === "" || textLink === null ? "" : curElem._doc.body.split(textLink)[1]}
                </p>
                {curElem._doc.thread_pic.url !== "" && (
                            <Image
                                src={curElem._doc.thread_pic.url}
                                draggable={false}
                                alt="userPOSTimg"
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                            />
                )}
                {/* <Image draggable={false} src={curElem._doc.thread_pic.url} alt="userPOSTimg" width={0} height={0} sizes="100vw"  style={{ width: '100%', height: 'auto' }} /> */}
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


export default HomeThread;