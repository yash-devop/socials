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
        const user = await ThreadModel.findOne({_id : userID}).populate("owner_id","-password").sort({"updatedAt" : -1})
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
        const splitedPath = path.split('/post/')[0].split('/api/')
        const newsplitted = splitedPath[1].split('%40')
        const username = newsplitted[1]
        console.log('splitted',username);
        const reqBody = await request.json()
        const {commentBody}  = reqBody;
        console.log('requestBodyyyyyy',splitedPath);

        const token = await getTokenData(request);
        console.log('token' , token);
        if(!token){
            return NextResponse.json({
                message: "User Not Logged in ! no Token Found",
                success : "failed"
            })
        }
        const user = await UserModel.find({username});

        console.log('userrrrCOMMENT',user);

        const comments = await UserModel.findByIdAndUpdate("64c692d9915728fb83ecb6ba", {
            $push: {
                comments: commentBody
            }
        }, {
            new: true,
        }).select('-password');
        
        // .populate('owner_id profilepic fullname username followers followings')



        return NextResponse.json(comments)

    } catch (error) {
        return NextResponse.json({
            message: error,
            success: "failed"
        })
    }
}