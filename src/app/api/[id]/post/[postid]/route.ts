import { getTokenData } from "@/helpers/getTokenData";
import ThreadModel from "@/models/Threads";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import UserModel from "@/models/UserModel";



export async function GET(request: NextRequest){
    
    try {
        const path = request.nextUrl.pathname;
        const splitedPath = path.split('/post/')
        const userID = splitedPath[1]
        const token = await getTokenData(request);
        console.log('token' , token);
        if(!token){
            return NextResponse.json({
                message: "User Not Logged in ! no Token Found",
                success : "failed"
            })
        }

        // const user = await UserModel.findOne({username : username[0]})
        const user = await ThreadModel.find()

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