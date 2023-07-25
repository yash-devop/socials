import React from 'react';
import {NextRequest ,NextResponse} from 'next/server'
import connect from '@/dbconfig/dbconfig';
import UserModel from '@/models/UserModel'
import bcryptjs from 'bcryptjs'
import {cloudinary} from '@/utils/cloudinary'

connect();


export async function POST(request : NextRequest){
    try {
        const reqbody= await request.json();
        const {username , password , fullname , profilepic} = reqbody;

        console.log(username)
        console.log(password)
        console.log(fullname)
        console.log(profilepic)


        const user = await UserModel.findOne({username});
        if(user){
            return NextResponse.json({
                message: "User already exists !",
                success : "failed"
            },{
                status: 400
            })
        }

        const cloudinaryResult = await cloudinary.v2.uploader.upload(profilepic.toString() ,{
            folder: "thread_images"
        })

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);
        

        const newUser = await UserModel.create({
            fullname: fullname,
            username,
            password: hashedPassword,
            profilepic:{
                public_id : cloudinaryResult.public_id,
                url: cloudinaryResult.secure_url
            }
        })
        
        // const savedUser = await newUser.save();
        return NextResponse.json(newUser);

        
    } catch (err) {
        return NextResponse.json({
            message : err,
            success: 'failed',
        }).status
    }
}
