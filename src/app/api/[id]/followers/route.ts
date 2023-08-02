import ThreadModel from "@/models/Threads";
import UserModel from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const pathname = request.nextUrl.pathname.split("/")
    const path = pathname[2]
    const splittedPath = path.split('/')[0]
    const username = splittedPath.split('%40')[1]
    console.log('username',username);
    try {
        const userWithFollowersAndFollowings = await UserModel.findOne({ username })
          .populate("followers", "_id fullname username profilepic") // Populate the followers field with _id, fullname, and username
          .populate("followings", "_id fullname username profilepic"); // Populate the followings field with _id, fullname, and username
    
        if (!userWithFollowersAndFollowings) {
          return NextResponse.json(
            { message: "User not found.", success: "failed" },
            { status: 404 }
          );
        }
    
        return NextResponse.json(userWithFollowersAndFollowings);
      } catch (error:any) {
        return NextResponse.json(
          { message: error.message, success: "failed" },
          { status: 500 }
        );
      }
}
