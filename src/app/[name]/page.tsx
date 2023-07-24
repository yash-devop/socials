"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import Thread from "../thread/page";
import { useRouter } from 'next/navigation'
export default function Username({params}:any){

    // const router = useRouter();
    const [isUserThreads , setIsUserThreads] = useState(false);
    const [userThread , setUserThread] = useState<any>();
    const getUserThread=async()=>{
        try {
            const response = await axios.get(`/api/${params.name}`)
            console.log('userThread', response);
            setUserThread(response.data)
            setIsUserThreads(true);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getUserThread();
    },[])
    return(
        <>
            <div>
            {
            isUserThreads ? (
                userThread && userThread.length > 0 ? (
                    userThread.map((curElem: any) => {
                  return (
                    <>
                        <Thread key={curElem._id} {...curElem} />
                    </>
                  );
                })
              ) : (
                // <h1>{decodeURIComponent(params.name)} doesnt exist</h1>
                // router.push('/login')
                <h1>{decodeURIComponent(params.name)} doesnt exist</h1>
                )
                ) : (
                  <div className='flex flex-col items-center justify-center h-80'>
                    <span className="loader"></span>
                    <p className="text-gray-600 pt-5">Please check the username or try to login again</p>
                  </div>
                    // router.push('/login')
            )
        }
            </div>
        </>
    )
}