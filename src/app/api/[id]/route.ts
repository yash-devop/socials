import { getTokenData } from "@/helpers/getTokenData";
import ThreadModel from "@/models/Threads";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import UserModel from "@/models/UserModel";



export async function GET(request: NextRequest){
    try {
        const path = request.nextUrl.pathname.split('/api/%40');
        console.log(path[1]);
        const token = await getTokenData(request);
        console.log('token' , token);
        if(!token){
            return NextResponse.json({
                message: "User Not Logged in ! no Token Found",
                success : "failed"
            })
        }

        const user = await UserModel.findOne({username : path[1]})
        console.log('user',user);
        // errorhandling
        if(!user){
            return NextResponse.json({
                message: "NO USER FOUND",
                success: "failed"
            },{status : 404})
        }



        // below line executes when user found or the above if condition failed
        const id = user._id;
        const fullname = user.fullname;

        const userName = await UserModel.findOne({_id: id});
        const user_name = userName.username;


        const userThread = await ThreadModel.find({ owner_id: id }).sort({createdAt: -1});
        // return NextResponse.json(userThread);
        const userThreadsWithUsername = userThread.map(thread => ({
            ...thread.toObject(),
            username: user_name, // Attach the username to the thread,
            fullname
          }));
      
          // Send the response with the userThreadsWithUsername array
          return NextResponse.json(userThreadsWithUsername);

    } catch (error) {
        return NextResponse.json({
            message: error,
            success: "failed"
        })
    }
}