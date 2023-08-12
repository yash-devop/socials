"use client";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Heart, MessageCircle, Repeat, Send } from "react-feather";

export default function PostPage({ params }: any) {
  const [postData, setPostData] = useState<any>({});
  const [commentData, setCommentData] = useState<any>([]);
  const [toggleComment, setToggleComment] = useState<any>(false);
  const [comments, setComments] = useState({
    body: "",
  });
  const getPost = async () => {
    try {
      const response = await axios.get(
        `/api/${params.name}/post/${params.postid}`
      );
      setPostData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getComments = async () => {
    try {
      const response = await axios.put(
        `/api/${params.name}/post/${params.postid}`,
        {
          commentBody: comments.body,
        }
      );
      setCommentData(response.data);
      getPost();
    } catch (error) {
      console.log(error);
    }
  };

  const showCommentBox = () => {
    setToggleComment(!toggleComment);
  };

  useEffect(() => {
    getPost();
  }, []);
  useEffect(() => {
    const textarea: any = document.querySelector("textarea");
    const textareaFunction = (e: any) => {
      textarea.style.height = "auto";
      let scheight = e.target.scrollHeight;
      textarea.style.height = `${scheight}px`;
    };
    textarea?.addEventListener("keyup", textareaFunction);

    return () => removeEventListener("keyup", textareaFunction);
  }, []);

  console.log("data", postData);
  console.log("Comments DATA", commentData);
  return (
    <>
      <div className="max-w-[500px] md:max-w-[700px] mx-auto border-b-[1px] border-[#333232] ">
        <div className="mx-2">
          <div className="flex items-center gap-3 my-4  ">
            <div className="">
              <img
                draggable={false}
                src={
                  "https://pbs.twimg.com/profile_images/77846223/profile_400x400.jpg"
                }
                alt=""
                className="rounded-full min-w-[30px] max-w-[45px]"
              />
            </div>
            <div className="w-full ">
              <div className="flex items-center justify-between">
                {/* redirect to @sophiadev when click on username */}
                <h1 className="hover:underline cursor-pointer text-lg font-semibold">
                  {"Sophia Johnson"}
                </h1>
              </div>
            </div>
          </div>
          <div className="my-4">
            {postData?.body ? (
              <>
                <p className="text-[0.9rem]">{postData?.body}</p>
              </>
            ) : (
              <>
                {/* <div className='flex items-center justify-center h-80'>
                  <span className="loader"></span>
              </div> */}
              </>
            )}
          </div>
          {postData?.thread_pic?.url !== "" ? (
            <Image
              id={`withThreadLine`}
              src={postData?.thread_pic?.url}
              draggable={false}
              alt="userPOSTimg"
              width={0}
              height={0}
              sizes="100vw"
              className=""
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "4px",
              }}
            />
          ) : (
            <>
              <div className="flex items-center justify-center h-80">
                <span className="loader"></span>
              </div>
            </>
          )}
          <div className="flex gap-5 my-4">
            <Heart className="w-[22px] cursor-pointer" />
            <MessageCircle
              className="w-[22px] cursor-pointer"
              onClick={showCommentBox}
            />
            <Repeat className="w-[22px] cursor-pointer" />
            <Send className="w-[22px] cursor-pointer" />
          </div>
          <div className="flex gap-4">
            <p className="text-sm">
              {postData?.owner_id?.comments?.length} replies
            </p>
            <p className="text-sm">. 10 likes</p>
          </div>
        </div>
        {toggleComment && (
          <>
            <textarea
              required
              className="w-full bg-[#16141491] p-4 rounded-lg outline-none"
              name="body"
              id=""
              placeholder="Say Something..."
              value={comments.body}
              onChange={(e) =>
                setComments({ ...comments, body: e.target.value })
              }
            ></textarea>
            <button className="border" onClick={getComments}>
              Comment
            </button>
          </>
        )}
        <div className="mb-10">
          {postData?.owner_id?.comments?.map((comment: any) => {
            return (
              <>
          <div className="flex gap-3 my-4 ">
            <div className="mt-3">
              <img
                draggable={false}
                src={
                  "https://pbs.twimg.com/profile_images/77846223/profile_400x400.jpg"
                }
                alt=""
                className="rounded-full min-w-[30px] max-w-[45px]"
              />
            </div>
            <div className="w-full  flex flex-col">
              <div className="flex flex-col  justify-between">
                {/* redirect to @sophiadev when click on username */}
                <h1 className="hover:underline cursor-pointer text-lg font-semibold">
                  {"Sophia Johnson"}
                </h1>
                <p className="text-sm">
                  {comment}
                </p>
              </div>
              <div className="flex gap-5 mt-4">
                <Heart className="w-[22px] cursor-pointer" />
                <MessageCircle className="w-[22px] cursor-pointer" />
                <Repeat className="w-[22px] cursor-pointer" />
                <Send className="w-[22px] cursor-pointer" />
              </div>
            </div>
          </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
