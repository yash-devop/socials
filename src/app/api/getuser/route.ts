import { getTokenData } from "@/helpers/getTokenData";
import ThreadModel from "@/models/Threads";
import UserModel from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    try {
        const userData = await getTokenData(request);
        console.log('userData', userData);
        return NextResponse.json(userData)

    } catch (error) {
        return NextResponse.json({
            message:error,
            success: "failed"
        },{status: 400})
    }
}