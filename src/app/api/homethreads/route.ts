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
        // console.log('user',threads);
        const getUsernamePromises = threads.map(async (thread) => {
            const owner_id = thread.owner_id;
            const user = await UserModel.findById(owner_id);
            // console.log('user',user);
            return user?.username || null; 
          });
      
          const usernames = await Promise.all(getUsernamePromises); // returns array of all the usernames.
        //   console.log(usernames)
          const transformedThreads = threads.map((thread, index) => ({
            ...thread,  //first copy the data.
            owner_id: { id: thread.owner_id, username: usernames[index] }  // then update the fields.
          }));

          // console.log("TRANSFORMEDThread",transformedThreads)
          return NextResponse.json(transformedThreads);

    } catch (err) {
        return NextResponse.json({
            message: "User not logged in ! No token found",
            success: "failed"
        })
    }
}