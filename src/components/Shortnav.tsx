import React, { useEffect, useState } from 'react'

const Shortnav = () => {
  const [sticky , setSticky ] = useState<Boolean | number>(0);
  useEffect(()=>{
    const handleScroll = ()=>{
      setSticky(window.scrollY >= 160)
    }
    window.addEventListener("scroll",handleScroll);

    return()=> removeEventListener("scroll",handleScroll)
  },[])
  return (
    <div className={`${sticky ? 'sticky' : "shortNavbar"}`}>
        <h1 className='tracking-[-2.3px] text-white font-semibold text-[25px] hover:cursor-default'>socials</h1>
    </div>
  )
}

export default Shortnav