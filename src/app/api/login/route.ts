import connect from "@/dbconfig/dbconfig";
import UserModel from "@/models/UserModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'
// require('dotenv')


connect();

export async function POST(request: NextRequest){
    try {
        const reqbody = await request.json();
        const {username, password} = reqbody;

        const user = await UserModel.findOne({username});

        if(!user){
            return NextResponse.json({
                message: "User does not exist !",
                success : "failed"
            },{status: 400})
        }

        // valid user

        const validPassword = await bcryptjs.compare(password,user.password);

        if(!validPassword){
            return NextResponse.json({
                message: "Invalid Password",
                success : "failed"
            },{status:400})
        }

        // Tokenization
        const payloadData = {
            id: user._id,
            username: user.username,
            password: validPassword
        }
        const token = jwt.sign(payloadData,process.env.TOKEN_SECRET!,{});

        const response =  NextResponse.json({
            message : "Login Successful",
            success : "pass"
        },{status: 200});

        response.cookies.set('token',token,{sameSite:'none',secure:true,httpOnly: true})  // todo : add the expiresIn key:Value.

        return response;


    } catch (err) {
        return NextResponse.json({
            message:"Error Occured while login",
            success: "failed"
        },{status: 400})
    }
}
