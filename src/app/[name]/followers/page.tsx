"use client";
import Followings from "@/components/Followings";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Heart, MessageCircle, Repeat, Send } from "react-feather";

const Followers = ({ params }: any) => {
  const [toggle, setToggle] = useState(1);
  const [getOthersData, setGetOthersData] = useState<any>([]);
  const [search, setSearch] = useState("");
  const updateToggle = (id: number) => {
    setToggle(id);
  };

  const getData = async () => {
    try {
      const response = await axios.get(`/api/${params.name}/followers`);
      console.log("followerDATA", response);
      setGetOthersData(response.data);
    } catch (error) {
      console.log("client error", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  console.log("getotherdata", getOthersData.followers);
  return (
    <>
      <div className="max-w-[500px] md:max-w-[650px] mx-auto ">
        {/* border-b-[1px] border-[#333232]  */}
        <div className="flex items-center gap-3 mt-4 mb-12">
          <div className="pt-2">
            <img
              draggable={false}
              src={
                "https://pbs.twimg.com/profile_images/77846223/profile_400x400.jpg"
              }
              alt=""
              className="rounded-full min-w-[30px] max-w-[45px]"
            />
          </div>
          <div className="w-full">
            <div className="flex flex-col">
              {/* redirect to @sophiadev when click on username */}
              <h1 className="hover:underline cursor-pointer text-lg font-semibold mb-0">
                {getOthersData.fullname}
              </h1>
              <p className="hover:underline cursor-pointer text-base text-[#4b4b4b]">
                {getOthersData.username}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border-b border-t border-[#3a3a3a] h-[50px]">
          <div
            className={`${
              toggle === 1
                ? "toggle-active w-full flex items-center justify-center cursor-pointer"
                : "w-full flex items-center justify-center cursor-pointer"
            } `}
            onClick={() => updateToggle(1)}
          >
            Followers
          </div>
          <div
            className={`${
              toggle === 2
                ? "toggle-active border-l w-full flex items-center justify-center cursor-pointer"
                : "w-full border-l flex items-center justify-center cursor-pointer"
            } `}
            onClick={() => updateToggle(2)}
          >
            Following
          </div>
        </div>
        <input
          type="search"
          placeholder="Search"
          className="mt-2 bg-[#4b4b4b34] text-[#808080] placeholder:text-[#808080] w-full h-10 rounded-lg pl-4 focus:outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />
        {toggle === 1
          ? getOthersData.followers?.length > 0
            ? getOthersData.followers
                .filter((item: any) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item.fullname.toLowerCase().includes(search);
                })
                .map((data: any) => {
                  console.log("DATAA", data);
                  return (
                    <>
                      <div className="flex items-center mb-5 pt-4">
                        <div className="w-[3.2rem] h-[3rem]">
                          <img
                            draggable={false}
                            src={data.profilepic?.url}
                            alt="userImg"
                            className="rounded-full w-[4rem] h-12 object-cover"
                          />
                        </div>
                        <div className="flex justify-between items-center w-full">
                          <div className="pl-3">
                            <h3>{data.fullname}</h3>
                            <p className="text-[#4b4b4b] pt-1.5">
                              @{data.username}
                            </p>
                          </div>
                          <button className="border h-10 w-24 rounded-3xl">
                            Follow
                          </button>
                        </div>
                      </div>
                    </>
                  );
                })
            : (
              <div className="flex items-center justify-center my-16">
                  <p className="text-[#4b4b4b]">User has no Followers</p>
              </div>
            )
          : getOthersData.followings?.length > 0
          ? getOthersData.followings
              .filter((item: any) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.fullname?.toLowerCase().includes(search) ||
                      item.username?.toLowerCase().includes(search);
              })
              .map((data: any) => {
                console.log("DATAA", data);
                return (
                  <>
                    <div className="flex items-center mb-5 pt-4">
                      <div className="w-[3.2rem] h-[3rem]">
                        <img
                          draggable={false}
                          src={data.profilepic?.url}
                          alt="userImg"
                          className="rounded-full w-[4rem] h-12 object-cover"
                        />
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <div className="pl-3">
                          <h3>{data.fullname}</h3>
                          <p className="text-[#4b4b4b]">@{data.username}</p>
                        </div>
                        <button className="border h-10 w-24 rounded-3xl">
                          Follow
                        </button>
                      </div>
                    </div>
                  </>
                );
              })
          : (
            <div className="flex items-center justify-center my-16">
                <p className="text-[#4b4b4b]">User has no Followings</p>
            </div>
          )}
      </div>
      {/* <p>User not yet have any followers !</p> */}
    </>
  );
};

export default Followers;
