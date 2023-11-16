"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import dummyIcon from '@/assets/alex.jpg'
import ThreadModal from './ThreadModal'
const ThreadBar = () => {
    const [showModal , setShowModal] = useState(false);
    const handleModalOpen=()=>{
        setShowModal(!showModal);
    }
    console.log(showModal);
  return (
    <>
        {
            showModal && <ThreadModal setClose={setShowModal}/>
        }
        <div className='w-full md:max-w-[600px] mx-auto flex gap-2 mb-4 items-center justify-center border-b border-[#414141] pb-2'>
            <Image src={dummyIcon} alt='thread-ico' className='w-10 h-10 rounded-full'/>
            <div onClick={()=>handleModalOpen()}  className='w-full bg-transparent placeholder:text-[#575757] outline-none border-none'>
                <input type="text" placeholder='Start Thread' className='w-full bg-transparent placeholder:text-[#575757] outline-none border-none'/>
            </div>
            <button className='rounded-full px-4 py-1.5 bg-[#414141] w-[80px] text-black'>Post</button>
        </div>
    </>
  )
}

export default ThreadBar