'use client'
 
import Image from 'next/image'
import React from 'react'
import Home from '@/assets/home.svg'
import Likes from '@/assets/likes.png'
import Edit from '@/assets/edit.png'
import Search from '@/assets/search.png'
import User from '@/assets/user.png'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const Navbar = () => {
  const pathname = usePathname()
  // const data = window.location.pathname
  console.log('params',pathname);
  return (
    <div className='max-w-[350px] mx-auto bg-[#2d2d2d8c] backdrop-blur-md flex justify-center items-center h-12 rounded-full fixed z-[1000] left-0 right-0 top-[6px] shadow-2xl drop-shadow-2xl'>
      <div className='flex items-center justify-center w-full rounded-full px-4 gap-1'>
          <div className='group'>
            <Link href={'/home'}>
              <div className={`${pathname === "/home" ? "bg-[#414141] text-white" : ""} px-5 py-2 rounded-full cursor-pointer`}>
                <svg viewBox="0 0 24 24" width="20" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={`text-[#6D6D6D] cursor-pointer transition-all`}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              </div>
            </Link>
          </div>
          <div className='group'>
          <Link href={'/search'}>

            <div className={`${pathname === "/search" ? "bg-[#414141] text-white" : ""} px-5 py-2 rounded-full cursor-pointer`}>
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={`text-[#6D6D6D]`}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
          </Link>
          </div>
          <div className='group'>
          <Link href={'/edit'}>

            <div className={`${pathname === "/edit" ? "bg-[#414141] text-white" : ""} px-5 py-2 rounded-full cursor-pointer`}>
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={`text-[#6D6D6D]`}><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            </div>
          </Link>
          </div>
          <div className='group'>
          <Link href={'/likes'}>

            <div className={`${pathname === "/likes" ? "bg-[#414141] text-white" : ""} px-5 py-2 rounded-full cursor-pointer`}>
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={`text-[#6D6D6D]`}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </div>
          </Link>
          </div>
          <div className='group'>
          <Link href={'/users'}>

            <div className={`${pathname === "/users" ? "bg-[#414141] text-white" : ""} px-5 py-2 rounded-full cursor-pointer`}>
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={`text-[#6D6D6D]`}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
          </Link>
          </div>
      </div>
    </div>
  )
}

export default Navbar