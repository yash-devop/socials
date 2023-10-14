import { getTokenData } from "@/helpers/getTokenData";
import ThreadModel from "@/models/Threads";
import UserModel from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    try {
        const token = await getTokenData(request);
        console.log("homeTOKEN", token)
        if(!token){
            return NextResponse.json("User not logged in ! No token found");
        }

        const threads = await ThreadModel.find().sort({ createdAt: -1 });
        console.log('userTHREADS',threads);
        const getUsernamePromises = threads.map(async (thread) => {
            const owner_id = thread.owner_id;
            const user = await UserModel.findById(owner_id);
            console.log('user',user);
            const comments = thread.comments;
            console.log('comments', comments);
            return user?.username || null; 
        });
        const getProfilePic = threads.map(async(thread)=>{
          const owner_id = thread.owner_id;
          const user = await UserModel.findById(owner_id);

          return user?.profilepic || null
        })
          const usernames = await Promise.all(getUsernamePromises); // returns array of all the usernames.
          const allProfilePic = await Promise.all(getProfilePic);

          console.log('allProPic', allProfilePic);
          const transformedThreads:any = threads.map((thread, index) =>  ({
            ...thread,  //first copy the data.
            owner_id: { id: thread.owner_id, username: usernames[index] , profilepic : allProfilePic[index] },  // then update the fields.
            comments: thread?.comments?.map((comment:any)=>comment?.user_id)
          }));

          // get the userpics:
          transformedThreads.map((thread:any)=>(console.log('threads' , thread)))
          return NextResponse.json(transformedThreads);

    } catch (err) {
        return NextResponse.json({
            message: "User not logged in ! No token found",
            success: "failed"
        })
    }
}