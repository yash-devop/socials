import { NextResponse,NextRequest } from "next/server";
import ThreadModel from "@/models/Threads.js";
import { getTokenData } from "@/helpers/getTokenData";
import {cloudinary} from '@/utils/cloudinary'

export async function POST(request : NextRequest){
    try {
        const reqbody = await request.json();
        const {body,thread_pic} = reqbody;

        const userData = await getTokenData(request);

        const cloudinaryResult = await cloudinary.v2.uploader.upload(thread_pic.toString() ,{
            folder: "thread_images"
        })

        if(thread_pic === "" || thread_pic === null ){ 
            const newThread = await ThreadModel.create({
                owner_id: userData.id,
                body,
                thread_pic:{
                    public_id : cloudinaryResult.public_id,
                    url: cloudinaryResult.secure_url
                }
            });
            const populatedThread = await ThreadModel.findById(newThread._id).populate({path:"owner_id",select:"_id"});  //"owner_id"
            return NextResponse.json(populatedThread);
        }
        else{
            const newThread = await ThreadModel.create({
                owner_id: userData.id,
                body,
            });
            const populatedThread = await ThreadModel.findById(newThread._id).populate({path:"owner_id",select:"_id"});  //"owner_id"
            return NextResponse.json(populatedThread);

        }


    } catch (err) {
        return NextResponse.json({
            message: err,
            success : "failed"
        },{status: 400})
    }
}