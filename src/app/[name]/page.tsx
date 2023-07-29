"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Thread from "../thread/page";
import Shortnav from "@/components/Shortnav";
import {DELETE} from '@/app/api/[id]/route'


export default function Username({ params }: any) {
  // const router = useRouter();
  const [isUserThreads, setIsUserThreads] = useState(false);
  const [userThread, setUserThread] = useState<any>();
  const [userData, setUserData] = useState<any>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const getUserThread = async () => {
    try {
      const response = await axios.get(`/api/${params.name}`);
      console.log("userThread", response);
      setUserThread(response.data);
      setIsUserThreads(true);
      if (response.data && response.data[0]?.userData?.followings?.length > 0) {
        setIsFollowing(true);
      } else {
        setIsFollowing(false);
      }
    } catch (error) {
      console.log(error);
    }
  };


  
  const followUser = async () => {
    try {
      const response = await axios.put(`/api/${params.name}`,{
        payload: {
            isClicked: true
          }
        });
      setUserData(response.data);
      getUserThread();
    } catch (error) {
      console.log(error);
    }
  };
  const unfollowUser = async () => {
    try {
      const response = await axios.put(`/api/${params.name}`);
      setUserData(response.data);
      getUserThread();
    } catch (error) {
      console.log(error);
    }
  };
  const toggleFollow = async () => {
    try {
      if (isFollowing) {
        // If user is following, unfollow
        await unfollowUser();
      } else {
        // If user is not following, follow
        await followUser();
      }
      setIsFollowing(!isFollowing); // Toggle the state after the API call is successful
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserThread();
  }, []);

  return (
    <>
      <div className="">
        {isUserThreads ? (
          userThread && userThread.length > 0 ? (
            <>
              {/* max-w-[670px] */}
              <div className="max-w-[670px] mx-auto ">
                <Shortnav />
                <div className="flex flex-col justify-center min-h-[350px] border-b border-[#1d1d1d] ">
                  <div className="flex w-full justify-between px-4 ">
                    <div className="pb-4">
                      <h1 className="mb-0 mr-0  -ml-2 font-bold text-[30px]">
                        {userThread ? userThread[0].fullname : "No user"}
                      </h1>
                      <h3 className="pt-2 -ml-1 font-semibold">
                        {userThread ? userThread[0].username : "No user"}
                      </h3>
                    </div>
                    <img
                      className="rounded-full w-20 h-20 mt-3.5 object-cover"
                      src={userThread[0].profile_pic.url}
                      alt="user-logo"
                    />
                    {/* <img className="rounded-full w-20 h-20 mt-3.5"  src="https://pbs.twimg.com/profile_images/77846223/profile_400x400.jpg" alt="user-logo" /> */}
                  </div>
                  <div className="px-3 mt-4">
                    <p className="font-light font leading-[24px] text-[16px]">
                      Full-Stack Developer💻
                      <br />
                      Currently building Codeplanner ⚒️
                      <br />
                      For business enquiries: tom@tom.dev
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 px-3 w-full py-4">
                    <div className="followers-followings flex gap-7 text-[#4b4747] py-4">
                      <div className="flex">
                        <p className="pr-1">
                          { userThread && userThread[0].userData?.followers.length }
                        </p>
                        <h2>Followers</h2>
                      </div>
                      <div className="flex">
                        <p className="pr-1">
                          {userThread &&
                            userThread[0].userData?.followings.length}
                        </p>
                        <h2>Following</h2>
                      </div>
                    </div>
                    {isFollowing ? (
          <button className="w-full rounded-md h-[3rem] bg-[#2b2b2baf] text-[#555555] outline-none" onClick={toggleFollow}>
            Following
          </button>
        ) : (
          <button className="border w-full rounded-md h-[3rem] outline-none" onClick={toggleFollow}>
            Follow
          </button>
        )}
                    {/* <button className="border w-full rounded-md h-[3rem]" onClick={followUser} >
                      Follow
                    </button>
                    <button className=" w-full rounded-md h-[3rem] bg-[#2b2b2baf] text-[#555555]">
                      Following
                    </button> */}
                  </div>
                </div>
                {userThread.map((curElem: any) => {
                  return (
                    <>
                      <Thread key={curElem._id} {...curElem} />
                    </>
                  );
                })}
              </div>
            </>
          ) : (
            // <h1>{decodeURIComponent(params.name)} doesnt exist</h1>
            // router.push('/login')
            <>
              <Shortnav />
              <h1>{decodeURIComponent(params.name)} doesnt exist</h1>
            </>
          )
        ) : (
          <>
            <Shortnav />
            <div className="flex flex-col items-center justify-center h-80">
              <span className="loader"></span>
              <p className="text-gray-600 pt-5">
                Please check the username or try to login again
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
