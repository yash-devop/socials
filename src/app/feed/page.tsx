"use client"

import {Image} from 'react-feather'
import React, { useEffect, useState } from 'react'
import Thread from '../thread/page'
import axios from 'axios'

const feed = () => {
  const [isLoading, setisLoading] = useState(true);
  const [threads , setThreads] = useState<any>();
  const [image, setImage] = useState<File | string>();
  const [threadBody,setThreadBody] = useState({
     body: "",
     thread_pic:"https://pbs.twimg.com/profile_images/77846223/profile_400x400.jpg"
  });
  const fetchThreads = async () => {
    try {
      const response = await axios.get("/api/feeds");
      setThreads(response.data.allThreads);
      setisLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  // get the threads on the feeds page:
  const allThreads=async()=>{
      try {
        const response = await axios.get("/api/feeds")
         console.log(response.data.allThreads)
         setThreads(response.data.allThreads)
         setisLoading(false);
      } catch (err) {
          console.log(err);
      }
  }
  // console.log("threads", threads)

  const postThreads=async(e: React.SyntheticEvent)=>{
     e.preventDefault();
     try {
        const response = await axios.post("/api/thread",threadBody)
        console.log(response);
        fetchThreads()
     } catch (err) {
        console.log(err);
     }
  }
   
  const handleImageInput=()=>{
    const imageInput = document.querySelector(".image-input") as HTMLElement;
    if (imageInput) {
      imageInput.click();
    }
  }

  useEffect(()=>{
      allThreads()
  },[])


  return (
    <div className='max-w-[700px] mx-auto'>

        <div className='p-4 mx-auto'>
          <form action="" onSubmit={postThreads}>
            <textarea required className=' w-full bg-[#48484891] p-4 rounded-lg outline-none' name="body" id="" placeholder='Say Something...' value={threadBody.body} onChange={(e)=>setThreadBody({...threadBody , body : e.target.value})}></textarea>
          
            <div className='flex justify-between items-center pt-2'>
                <Image width={24} onClick={handleImageInput}/>
                <input type="file" hidden accept='image/*' className='image-input' onChange={({target})=>{
                    if(target.files){
                       const file = target.files[0];
                       setImage(file);
                      //  setImage(URL.createObjectURL(file));
                    }
                }}/>
                <input type="submit" value="Post" className='bg-white text-black py-2 px-4 border border-black rounded text-sm ' />
            </div>
          
          </form>
        </div>                         
        {
            threads && threads.map((curElem:any)=>{
                return(
                    <>
                        <Thread key={curElem._id} {...curElem} />                
                    </>
                )
            })
        }
    </div>
  )
}

export default feed