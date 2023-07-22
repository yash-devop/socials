import { getTokenData } from "@/helpers/getTokenData";
import ThreadModel from "@/models/Threads";
import UserModel from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    try {
        const userData = await getTokenData(request);
        const {id} = userData;
        console.log("userID: ",id)
        const allThreads = await ThreadModel.find({owner_id : id}).populate("owner_id","-password")
        // const user = await UserModel.find({_id : id}).select(['-password'])
        return NextResponse.json({
            allThreads,
        })

    } catch (error) {
        return NextResponse.json({
            message:error,
            success: "failed"
        },{status: 400})
    }
}