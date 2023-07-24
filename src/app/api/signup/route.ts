import React from 'react';
import {NextRequest ,NextResponse} from 'next/server'
import connect from '@/dbconfig/dbconfig';
import UserModel from '@/models/UserModel'
import bcryptjs from 'bcryptjs'


connect();


export async function POST(request : NextRequest){
    try {
        const reqbody= await request.json();
        const {username , password , fullname} = reqbody;

        console.log(username)
        console.log(password)
        console.log(fullname)


        const user = await UserModel.findOne({username});
        if(user){
            return NextResponse.json({
                message: "User already exists !",
                success : "failed"
            },{
                status: 400
            })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);
        

        const newUser = await UserModel.create({
            fullname: fullname,
            username,
            password: hashedPassword,
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
