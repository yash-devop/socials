import connect from "@/dbconfig/dbconfig";
import UserModel from "@/models/UserModel";
import ThreadModel from "@/models/Threads";
import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
// connect()
const prisma = new PrismaClient();
export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const threads = await prisma.user.findMany({
        select:{
            id:true,
            fullname:true,
            username:true,
            profilepic:true,
            password:false
        }
    });
    console.log("threads", threads);

    return NextResponse.json(
      {
        users: threads,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: err,
        success: "failed",
      },
      { status: 400 }
    );
  }
}
// connect()
// export async function GET(request:NextRequest , response: NextResponse){
//     try {
//         const threads = await ThreadModel.find();
//         console.log('threads',threads);
//         return NextResponse.json({
//              data: threads
//             },{
//                 status: 200
//             }
//         )
//     } catch (err) {
//         return NextResponse.json({
//             message: err,
//             success: "failed",
//         },{status: 400})
//     }
// }
