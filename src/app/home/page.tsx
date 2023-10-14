"use client"

import {Image as ImageIcon} from 'react-feather'
import {XCircle} from 'react-feather'
import Image from 'next/image'
import React, { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios'
import HomeThread from '../homethread/page'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';
import Shortnav from '@/components/Shortnav';


const home = () => {
  const router = useRouter();
  const [displayImage , setDisplayImage] = useState<any>("");
  const [threads , setThreads] = useState<any>();
  const [homePageThreads , setHomePageThreads] = useState<any>();
  const [isHomePageThreads , setIsHomePageThreads] = useState(false);
  const [image, setImage] = useState<string | ArrayBuffer| null>("");
  console.log('IMAGEE',image);
  const [threadBody,setThreadBody] = useState({
     body: "",
     thread_pic: image
  });

  console.log("reactThreadbody",threadBody)
useEffect(()=>{
  const textarea: any = document.querySelector("textarea");
  const textareaFunction = (e:any)=>{
    textarea.style.height = "auto";
    let scheight = e.target.scrollHeight;
    textarea.style.height = `${scheight}px`;
}
  textarea?.addEventListener("keyup",textareaFunction)

  return ()=> removeEventListener("keyup",textareaFunction)
},[])
  const deleteImage=()=>{
    setDisplayImage(null);
  }
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileToBase(file);
      setDisplayImage(URL.createObjectURL(file));
    }
    else{
      setImage("")
    }
  };

  const setFileToBase = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };
  const notifySuccess = () => toast.success('Post created', {
    style: {
      border: '1px solid #161414;',
      padding: '8px',
      color: '#000000',
      backgroundColor:"#161414;",
    },
    iconTheme: {
      primary: '#ffffff;',
      secondary: '#161414;',
    },
  });
  const notifyError = () => toast.error("Error occured , try again !")
  const postThreads=async(e: React.SyntheticEvent)=>{
     e.preventDefault();
     try {
        const response = await axios.post("/api/thread",threadBody)
        // fetchThreads();
        notifySuccess();
        setDisplayImage(null);
        setThreadBody({...threadBody , body:""})

     } catch (err) {
        console.log(err);
        notifyError();
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
  // const fetchThreads = async () => {
  //   try {
  //     const response = await axios.get("/api/feeds");
  //     setThreads(response.data.allThreads);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

   
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
      thread_pic: image ,
    }));
  }, [image]);

  useEffect(()=>{
      homeThreads()
  },[])
  // useEffect(()=>{
  //     fetchThreads()
  // },[])

  console.log('NEW METHOD', homePageThreads);

  return (
    <>
      <Shortnav/>
      <div className='max-w-[640px] mx-auto'>
          <div className='w-full mx-auto flex items-center mb-4 pb-3 border-b border-[#414141]'>
            <div className=''>
              <img alt='img' src='https://pbs.twimg.com/profile_images/77846223/profile_400x400.jpg' className='w-[50px] h-[50px] object-cover rounded-full'/>
            </div>
            <form action="" onSubmit={postThreads} className='flex w-full'>
                {/* bg-[#16141491]  */}
                <textarea required  className='flex items-center w-full bg-transparent p-4 rounded-lg outline-none font-light' name="body" id="" placeholder='Say Something...' value={threadBody.body} onChange={(e)=>setThreadBody({...threadBody , body : e.target.value})}></textarea>
                <div className='HomeImage-btn flex justify-between items-center pt-2 cursor-pointer' >
                    <div data-rnwi-h7ga17-hover-focus="true" className='w-[50px] h-[50px] flex items-center justify-center rounded-full' onClick={handleImageInput}>
                      <ImageIcon width={24} className='cursor-pointer' />
                    </div>
                    <input type="file" hidden accept='image/*' className='image-input' onChange={handleImage}/>
                    {
                      threadBody.body === "" || threadBody.body.length <= 4 ? (
                          <>
                              <input type="submit" disabled value="Post" className='bg-[#292929] text-black py-2 px-4 border border-black rounded text-sm cursor-pointer' />
                          </>
                      ) : (
                        <>
                              <input type="submit" value="Post" className='bg-white text-black py-2 px-4 border border-black rounded text-sm cursor-pointer' />
                        </>
                      )
                    }
                </div>
                <Toaster
                    position="bottom-center"
                    reverseOrder={true}
                />
            </form>
          </div>                         
            {
                    displayImage ? (
                      <>
                      
                          <div className='relative  flex '>
                            <img src={displayImage} draggable={false} alt="" className='overflow-x-hidden relative w-[400px] min-h-[260px] max-h-[260px] aspect-auto object-cover rounded-lg'/>
                            <div className='absolute inset-0'>
                            <XCircle  width={40} className='mt-3 mr-2 top-0 right-0 shadow-2xl  text-[#41404b] cursor-pointer' onClick={deleteImage}/>
                            </div>
                          </div>
                      </>
                    ) : null
            }
            
          {
              isHomePageThreads ? (
                homePageThreads && homePageThreads.length > 0 ? (
                  homePageThreads.map((curElem: any) => {
                    return (
                      <>
                        <HomeThread key={curElem?._doc?._id } {...curElem} />
                      </>
                    );
                  })
                ) : (
                  router.push('/login')
                  )
                  ) : (
                <div className='flex items-center justify-center h-60'>
                  <span className="loader"></span>
                </div>
              )
          }
      </div>
    </>
  )
}

export default home