"use client";
import React, { useEffect, useState } from "react";
import {
  MoreHorizontal,
  Heart,
  Repeat,
  Send,
  MessageCircle,
} from "react-feather";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import extractLink from "@/helpers/extractLink";
import en from 'javascript-time-ago/locale/en.json'
import { useRouter } from "next/navigation";
TimeAgo.addDefaultLocale(en)
const HomeThread = (curElem: any, index: any) => {
  const router = useRouter();
  const textLink = extractLink(curElem._doc.body);
  console.log("Image indexes", curElem._doc._id);
  const [imageHeight, setImageHeight] = useState<number | null>(null);

  const handleImageLoad = () => {
    const image = document.getElementById(`withThreadLine-${curElem._doc._id}`); // Use unique id based on the object's _id
    if (image) {
      const height = image.clientHeight;
      console.log(`Image height for id ${curElem._doc._id}:`, height);
      setImageHeight(height);
    }
  };
  console.log('iddddddd',curElem);
  const redirectTo=()=>{
    router.push(`${curElem?.owner_id?.username}/post/${curElem?._doc?._id}`)
}

  useEffect(() => {
    const image = document.getElementById(`withThreadLine-${curElem._doc._id}`);
    if (image) {
      setImageHeight(image.clientHeight);
    }
    
    // Call handleImageLoad to set initial height
    handleImageLoad();

    window.addEventListener("load", handleImageLoad);
    return () => {
      window.removeEventListener("load", handleImageLoad);
    };
  }, [imageHeight]);
  return (
    <>
      <div className="flex gap-3 my-4 mx-3.5 border-b-[1px]  border-[#333232]">
        <div className="pt-4  flex flex-col items-center ">
          {curElem.owner_id.profilepic &&
          Object.getOwnPropertyNames(curElem.owner_id.profilepic).length > 0 ? (
            <Image
              src={curElem.owner_id.profilepic.url}
              className="rounded-full min-w-[45px] min-h-[45px] object-cover"
              draggable={false}
              alt="profile-pic"
              width={45}
              height={0}
              sizes="100vw"
            />
          ) : (
            <Image
              src={
                "https://pbs.twimg.com/profile_images/77846223/profile_400x400.jpg"
              }
              className="rounded-full min-w-[45px] min-h-[45px] object-cover"
              draggable={false}
              alt="profile-pic"
              width={45}
              height={0}
              sizes="100vw"
            />
          )}
          <div className="thread_card_bar" style={{ height: imageHeight ? `${imageHeight}px` : 'auto' }}></div>
        </div>
        <div className="w-full">
          <div onClick={()=>redirectTo()} className="cursor-pointer">

          <div className="flex items-center justify-between">
            <h1 className="hover:underline cursor-pointer text-lg font-semibold">
              <Link href={`/@${curElem.owner_id.username}`}>
                {curElem.owner_id.username}
              </Link>
            </h1>
            <div className="flex">
              <p className="text-[rgba(97,97,97,1)] mr-3"><ReactTimeAgo date={curElem?._doc?.updatedAt} locale='en-US'/></p>
              <MoreHorizontal className="" />
            </div>
          </div>
          <div>
            <p className="mb-3">
              {textLink === "" || textLink === null
                ? ""
                : curElem._doc.body.split(textLink)[0]}
              {textLink === "" || textLink === null ? (
                curElem._doc.body
              ) : (
                <a
                  href={textLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400"
                >
                  {textLink}
                </a>
              )}
              {textLink === "" || textLink === null
                ? ""
                : curElem._doc.body.split(textLink)[1]}
            </p>
          </div>
          {curElem._doc.thread_pic.url !== "" && (
            <>
              <Image
                id={`withThreadLine-${curElem._doc._id}`}
                src={curElem._doc.thread_pic.url}
                draggable={false}
                alt="userPOSTimg"
                width={0}
                height={0}
                sizes="100vw"
                className=""
                style={{ width: "100%", height: "auto", borderRadius: "4px" }}
              />
            </>
          )}
          </div>
          <div className="flex gap-5 py-4">
            <Heart className="w-[22px]" />
            <MessageCircle className="w-[22px]" />
            <Repeat className="w-[22px]" />
            <Send className="w-[22px]" />
          </div>
          <div className="text-[rgba(97,97,97,1)] pb-4 flex">
            <p>24,475 replies</p>
            <p className="px-3">·</p>
            <p>127,883 likes</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeThread;
