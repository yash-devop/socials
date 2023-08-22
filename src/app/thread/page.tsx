"use client"
import React from 'react'
import {MoreHorizontal,Heart,Repeat,Send,MessageCircle} from 'react-feather'
import ReactTimeAgo from 'react-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import TimeAgo from 'javascript-time-ago'
import Image from 'next/image'
import extractLink from '@/helpers/extractLink'
import { useRouter, useSearchParams } from 'next/navigation'
TimeAgo.addDefaultLocale(en)
const Thread = (curElem:any) => {
    const router = useRouter();
    console.log('curELMENT',curElem);
    const textLink = extractLink(curElem.body);
    console.log('TextLink' , textLink);

    const pathname = window.location.pathname
    console.log('pathname',pathname);


    const redirectTo=()=>{
        router.push(`${pathname}/post/${curElem._id}`)
    }

  return (
    <>
        <div className='flex gap-3 my-4 mx-3.5 border-b-[1px] border-[#333232]'>
            <div className='bg-red pt-4 '>
                <Image src={curElem?.profile_pic?.url} className='rounded-full min-w-[45px] min-h-[45px] object-cover' draggable={false}
                    alt="profile-pic"
                    width={45}
                    height={0}
                    sizes="100vw"
                />
            </div>
            <div className='w-full'>
                <div className='flex items-center justify-between'>
                    <h1 className='hover:underline cursor-pointer text-lg font-semibold'>{curElem.username}</h1>
                    <div className='flex'>
                        <p className='text-[rgba(97,97,97,1)] mr-3'><ReactTimeAgo date={curElem.createdAt} locale='en-US'/></p>
                        <MoreHorizontal className=''/>
                    </div>
                </div>
                <div className='threadLine cursor-pointer' onClick={redirectTo}>
                    <div className='' id='threadLine'>
                    <p className='mb-3'>
                        {/* {
                            textLink === "" || textLink === null ? (
                                curElem.body
                            ) : (
                                <>
                                    {
                                        curElem.body.split(textLink)[0]
                                    }
                                    <a href={textLink} target="_blank" rel="noopener noreferrer" className='text-blue-400'>{textLink}</a>
                                    {
                                        curElem.body.split(textLink)[1]
                                    }
                                </>
                            )
                        } */}
                    </p>
                        {curElem.thread_pic.url !== "" && (
                            <Image
                                src={curElem.thread_pic.url}
                                draggable={false}
                                alt="userPOSTimg"
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                            />
                            )}
                    </div>
                </div>
                <div className='flex gap-5 py-4'>
                    <Heart className='w-[22px] cursor-pointer'/>
                    <MessageCircle className='w-[22px] cursor-pointer'/>
                    <Repeat className='w-[22px] cursor-pointer'/>
                    <Send className='w-[22px] cursor-pointer'/>
                </div>
                <div className='text-[rgba(97,97,97,1)] pb-4 flex'>
                    <p>{curElem?.comments?.length} replies</p>
                    <p className='px-3'>·</p>
                    <p>127,883 likes</p>
                </div>
            </div>
        </div>
    </>
  )
}


export default Thread