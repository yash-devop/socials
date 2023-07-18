import { NextResponse,NextRequest } from "next/server";
import ThreadModel from "@/models/Threads.js";

export async function POST(request : NextRequest){
    try {
        const reqbody = await request.json();
        const {body,thread_pic} = reqbody;
        console.log(body)
        console.log(thread_pic)
        const newThread = await ThreadModel.create({
            body,
            thread_pic
        });

        // console.log(resp);
        
        // const saveThread = await resp.save();
        
        // console.log(saveThread);
        // return saveThread;
        const populatedThread = await ThreadModel.findById(newThread._id).populate("owner_id");

        return NextResponse.json(populatedThread);

    } catch (err) {
        return NextResponse.json({
            message: err,
            success : "failed"
        },{status: 400})
    }
}