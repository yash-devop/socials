import { NextResponse,NextRequest } from "next/server";
import ThreadModel from "@/models/Threads.js";
import UserModel from "@/models/UserModel";
import jwt from 'jsonwebtoken';
import { getTokenData } from "@/helpers/getTokenData";


export async function POST(request : NextRequest){
    try {
        const reqbody = await request.json();
        const {body,thread_pic} = reqbody;
        console.log(body)
        console.log(thread_pic)
        const userData = await getTokenData(request);
        console.log('userData from TOken: ',userData);
        // const user = await UserModel.findOne({username})
        const newThread = await ThreadModel.create({
            owner_id: userData.id,
            body,
            thread_pic
        });
        // console.log('newthread', newThread);
        const populatedThread = await ThreadModel.findById(newThread._id).populate({path:"owner_id",select:"_id"});  //"owner_id"
        console.log('populatedThread', populatedThread);

        return NextResponse.json(populatedThread);

    } catch (err) {
        return NextResponse.json({
            message: err,
            success : "failed"
        },{status: 400})
    }
}