import { getTokenData } from "@/helpers/getTokenData";
import ThreadModel from "@/models/Threads";
import UserModel from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    console.log('request',request);
    try {
        const path = request.nextUrl.pathname;
        const splitedPath = path.split('/post/')
        const userID = splitedPath[1]
        console.log('userID',userID);
        const token = await getTokenData(request);
        console.log('token' , token);
        if(!token){
            return NextResponse.json({
                message: "User Not Logged in ! no Token Found",
                success : "failed"
            })
        }

        // const user = await ThreadModel.findOne({_id : userID})
        const user = await ThreadModel.findOne({_id : userID}).populate("owner_id","-password").populate("comments.user_id","-password").sort({"updatedAt" : -1})
        // const user = await ThreadModel.find()

        console.log('user ka data aaya re',user);
        // errorhandling
        if(!user){
            return NextResponse.json({
                message: "NO USER FOUND",
                success: "failed"
            },{status : 404})
        }




        return NextResponse.json(user)

    } catch (error) {
        return NextResponse.json({
            message: error,
            success: "failed"
        })
    }
}


export async function PUT(request: NextRequest){
    try {
        const path = request.nextUrl.pathname;
        const splitedPath = path.split('/post/')[1]
        const reqBody = await request.json()
        const {commentBody}  = reqBody;

        const token = await getTokenData(request);
        console.log('token' , token);
        if(!token){
            return NextResponse.json({
                message: "User Not Logged in ! no Token Found",
                success : "failed"
            })
        }
        const loggedInUser = await UserModel.findById(token.id);
        console.log('logggiend',loggedInUser._id);

        if (!loggedInUser) {
            return NextResponse.json({
                message: "User not found",
                success: "failed"
            });
        }
        
        // const TargettedUser = await UserModel.findOne({ username : targetUsername });

        // const newComment = {
        //     text: commentBody, 
        //     postedBy: loggedInUser
        // };

        const updatedThread = await ThreadModel.findByIdAndUpdate(splitedPath, {
            $push: {
                comments: {
                    user_id: loggedInUser._id,
                    text: commentBody,
                }
            }
        }, { new: true }).populate("comments.user_id","-password")

        return NextResponse.json(updatedThread);

    } catch (error) {
        return NextResponse.json({
            message: error,
            success: "failed"
        })
    }
}       


// .populate({
    //     path: "comments",
    //     model: "users",
    //     select: "+profilepic"
    // })