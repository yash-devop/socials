"use client"
import axios from 'axios';
import React, { useState ,useEffect, ChangeEvent} from 'react'
import Link from 'next/link'; 'next/link'
import {Image as ImageIcon} from 'react-feather'
import { Toaster, toast } from 'react-hot-toast';
  
const signup = () => {
    const [displayImage , setDisplayImage] = useState<any>("");
    const [image, setImage] = useState<string | ArrayBuffer | null | any>(null);
    const [previewImg , setPreviewImg] = useState<any>();
    const [user ,setUser] = useState({
        username: "",
        password: "",
        fullname:"",
        profilepic: image
    })
   
    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          setFileToBase(file);
          setPreviewImg(URL.createObjectURL(file));
        }
      };
    
      const setFileToBase = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setImage(reader.result);
        };
      };


    const handleSubmit=async()=>{
        try {
            axios.post('/api/signup',user)
            toast.success("Signup Successful")
          } catch (err) {
            console.log(err)
            toast.error("Error")
        }
    }

    const handleImageInput=()=>{
        const imageInput = document.querySelector(".image-input") as HTMLElement;
        if (imageInput) {
          imageInput.click();
        }
      }
  
    useEffect(() => {
        // Update threadPic whenever the image state changes
        setUser((prevThreadBody) => ({
          ...prevThreadBody,
          profilepic: image,
        }));
      }, [image]);

      console.log('ProfileImage', user.profilepic);
  return (
    <>
        <div className='flex flex-col pt-2 max-w-[400px] mx-auto justify-center min-h-screen'>
            <div className='flex items-center'>
                <h1>Signup</h1>
                {
                    previewImg ? (
                        <>
                            <img src={previewImg} alt="" className='rounded-full w-[70px] h-[70px] object-cover'/>
                        </>
                    ) : null
                }
            </div>
            <input type="text" placeholder='Enter fullname' name="fullname" id="fullname" className='rounded-md h-12 pl-2  mb-3 text-black outline-none' value={user.fullname} onChange={(e)=>setUser({...user , fullname:e.target.value})}/>
            <input type="text" placeholder='Enter username' name="username" id="username" className='rounded-md h-12 pl-2  mb-3 text-black outline-none' value={user.username} onChange={(e)=>setUser({...user , username:e.target.value})}/>
            <input type="text" placeholder='Enter password' name="password" id="username" className='rounded-md h-12 pl-2  text-black outline-none' value={user.password} onChange={(e)=>setUser({...user , password:e.target.value})}/>
            <div data-rnwi-h7ga17-hover-focus="true" className='w-[50px] h-[50px] flex items-center justify-center rounded-full' onClick={handleImageInput}>
                  <ImageIcon width={24} className='cursor-pointer' />
              </div>
              <input type="file" hidden accept='image/*' className='image-input' onChange={handleImage}/>
            
            <button type='submit' className='p-4 border border-gray-200 max-w-[100px] mt-2 rounded-md' onClick={handleSubmit}>Signup</button>
            <Link href={'/login'} className='text-blue-400'>Signin ?</Link>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    </>
  )
}

export default signup