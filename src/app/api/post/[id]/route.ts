import { getTokenData } from "@/helpers/getTokenData";
import { NextRequest, NextResponse } from "next/server";

export default async function GET(request: NextRequest) {
    
    try {

        const user = await getTokenData(request);

        if(!user){
            return NextResponse.json({
                message: "User not found , Please login !",
                success: "failed"
            })
        }

        

    } catch (error) {
        return NextResponse.json({
            message: error,
            success: "failed"
        },{status: 500})        
    }

}