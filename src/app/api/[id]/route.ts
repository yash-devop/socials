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

        // errorhandling
        if(!user){
            return NextResponse.json({
                message: "NO USER FOUND",
                success: "failed"
            },{status : 404})
        }
        // below line executes when user found or the above if condition failed
        const id = user._id;

        const userThread = await ThreadModel.find({ owner_id: id });
        return NextResponse.json(userThread);

    } catch (error) {
        return NextResponse.json({
            message: error,
            success: "failed"
        })
    }
}