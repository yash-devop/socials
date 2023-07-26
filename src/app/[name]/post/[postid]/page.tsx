"use client"
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

export default function PostPage({params}:any){
  const getPost=async()=>{
      try {
          const response = await axios.get(`/${params.name}/post/${params.postid}`)
          console.log('getPost W :' , response);
      } catch (error) {
         console.log(error);
      }
  }
  useEffect(()=>{
    getPost();
  },[])
  return (
    <>
        <div>
            PostPage : {params.postid}
        </div>
    </>
  )
}
