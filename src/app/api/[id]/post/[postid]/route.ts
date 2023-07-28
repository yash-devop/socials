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