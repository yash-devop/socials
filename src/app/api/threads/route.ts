import { getTokenData } from "@/helpers/getTokenData";
import ThreadModel from "@/models/Threads";
import {cloudinary}  from "@/utils/cloudinary";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const reqbody = await request.json();
    console.log('reqbodyy', reqbody);
    const { body, thread_pic } = reqbody;

    const userData = await getTokenData(request);

    // console.log("threadpicture", thread_pic);
    // console.log("userData", userData);
    console.log("Body", body);

    if (thread_pic) {
      const cloudinaryResult = await cloudinary.v2.uploader.upload(
        thread_pic.toString(),
        {
          folder: "thread_images",
        }
      );
      const newThread = await prisma.threads.create({
        data: {
          owner_id: userData.id,
          body,
          thread_pic: {
            create: {
              public_id: cloudinaryResult.public_id,
              url: cloudinaryResult.secure_url,
            },
          },
        },
      });
      //   const newThread = await ThreadModel.create({
      //     owner_id: userData.id,
      //     body,
      //     thread_pic: {
      //        public_id: cloudinaryResult.public_id ,
      //        url : cloudinaryResult.secure_url ,
      //     }
      //   });
      // const populatedThread = await ThreadModel.findById(newThread._id).populate({
      //   path: "owner_id",
      //   select: "_id",
      // }); //"owner_id"

      // console.log("SOphia Thread", populatedThread);

      // return NextResponse.json(populatedThread);

      console.log("ThreadsPOSTfromPrisma", newThread);

      return NextResponse.json(newThread);
    } else {
      // const newThread = await ThreadModel.create({
      //     owner_id: userData.id,
      //     body,
      //     thread_pic: {
      //         public_id: "" ,
      //         url :"" ,
      //     }
      // });

      // const populatedThread = await ThreadModel.findById(newThread._id).populate({
      //   path: "owner_id",
      //   select: "_id",
      // }); //"owner_id"

      // console.log("SOphia Thread", populatedThread);

      // return NextResponse.json(populatedThread);
      const newThread = await prisma.threads.create({
        data: {
          user_id: userData.id,
          body,
          thread_pic: {
            create: {
              public_id: "",
              url: "",
            },
          },
          
        }
      });

      console.log("ThreadsPOSTfromPrismaWithout IMAGE", newThread);

      return NextResponse.json(newThread);
    }
  } catch (err:any) {
    console.log('error:',err);
    return NextResponse.json(
      {
        message: err.message,
        success: "failed",
      },
      { status: 400 }
    );
  }
}
