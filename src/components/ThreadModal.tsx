import React, { Dispatch, SetStateAction } from 'react'
import dummyIcon from '@/assets/alex.jpg'
import Image from 'next/image'

interface ThreadModalProps {
    setClose : Dispatch<SetStateAction<boolean>>
}
const ThreadModal:React.FC<ThreadModalProps> = ({setClose}) => {
  return (
    <>
        <div className='fixed left-0 right-0 top-10 z-50 mx-auto w-full h-full bg-[#26262648] flex items-center justify-center'>
            <div className='w-[550px] h-[450px] bg-[#2D2D2D] drop-shadow-2xl shadow-2xl'>
                <Image src={dummyIcon} alt='thread-ico' className='w-10 h-10 rounded-full'/>
                <h1 onClick={()=>setClose(false)} className='text-red-400'>Close me</h1>
            </div>
        </div>
    </>
  )
}

export default ThreadModal