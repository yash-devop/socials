"use client"

import {Image} from 'react-feather'
import React, { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios'
import HomeThread from '../homethread/page'
import { useRouter } from 'next/navigation'



const home = () => {
  const router = useRouter();
  const [threads , setThreads] = useState<any>();
  const [homePageThreads , setHomePageThreads] = useState<any>();
  const [isHomePageThreads , setIsHomePageThreads] = useState(false);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  console.log('IMAGEE',image);
  const [threadBody,setThreadBody] = useState({
     body: "",
     thread_pic: image
  });

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileToBase(file);
    }
  };

  const setFileToBase = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };
  const postThreads=async(e: React.SyntheticEvent)=>{
     e.preventDefault();
     try {
        const response = await axios.post("/api/thread",threadBody)
        fetchThreads();
     } catch (err) {
        console.log(err);
     }
  }
  const homeThreads=async()=>{
    try {
       const response = await axios.get('/api/homethreads')
       setHomePageThreads(response.data);
       setIsHomePageThreads(true);
    } catch (err) {
      console.log(err);
    }
  }
  const fetchThreads = async () => {
    try {
      const response = await axios.get("/api/feeds");
      setThreads(response.data.allThreads);
    } catch (err) {
      console.log(err);
    }
  };

   
  const handleImageInput=()=>{
    const imageInput = document.querySelector(".image-input") as HTMLElement;
    if (imageInput) {
      imageInput.click();
    }
  }
  useEffect(() => {
    // Update threadPic whenever the image state changes
    setThreadBody((prevThreadBody) => ({
      ...prevThreadBody,
      thread_pic: image,
    }));
  }, [image]);

  useEffect(()=>{
      homeThreads()
  },[])
  useEffect(()=>{
      fetchThreads()
  },[])

  return (
    <div className='max-w-[700px] mx-auto'>

        <div className='p-4 mx-auto'>
          <form action="" onSubmit={postThreads}>
            <textarea required className=' w-full bg-[#48484891] p-4 rounded-lg outline-none' name="body" id="" placeholder='Say Something...' value={threadBody.body} onChange={(e)=>setThreadBody({...threadBody , body : e.target.value})}></textarea>
          
            <div className='flex justify-between items-center pt-2'>
                <Image width={24} onClick={handleImageInput}/>
                <input type="file" hidden accept='image/*' className='image-input' onChange={handleImage}/>
                <input type="submit" value="Post" className='bg-white text-black py-2 px-4 border border-black rounded text-sm ' />
            </div>
          
          </form>
        </div>                         
        {/* {
            threads && threads.map((curElem:any)=>{
                return(
                    <>
                        <Thread key={curElem._id} {...curElem} />                
                    </>
                )
            })
        } */}
        {
            isHomePageThreads ? (
              homePageThreads && homePageThreads.length > 0 ? (
                homePageThreads.map((curElem: any) => {
                  return (
                    <>
                      <HomeThread key={curElem._id} {...curElem} />
                    </>
                  );
                })
              ) : (
                router.push('/login')
                )
                ) : (
              <div className='flex items-center justify-center h-80'>
                <span className="loader"></span>
              </div>
            )
        }
    </div>
  )
}

export default home