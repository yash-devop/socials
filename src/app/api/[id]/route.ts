import { getTokenData } from "@/helpers/getTokenData";
import ThreadModel from "@/models/Threads";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import UserModel from "@/models/UserModel";



export async function GET(request: NextRequest){
    try {
        const path = request.nextUrl.pathname.split('/api/%40');
        // console.log(path[1]);
        const token = await getTokenData(request);
        console.log('token' , token);
        if(!token){
            return NextResponse.json({
                message: "User Not Logged in ! no Token Found",
                success : "failed"
            })
        }

        const user = await UserModel.findOne({username : path[1]})
        // const userDatawe = await UserModel.findOne({ _id: token.id }).lean();
        // console.log('userDatawe',userDatawe);
        // errorhandling
        if(!user){
            return NextResponse.json({
                message: "NO USER FOUND",
                success: "failed"
            },{status : 404})
        }



        // below line executes when user found or the above if condition failed
        const id = user._id;
        const fullname = user.fullname;
        const profile_pic = user.profilepic;
        const userName = await UserModel.findOne({_id: id});
        const user_name = userName.username;
        
        const userData = await UserModel.findOne({_id: id}).populate('followers').select('-password');

        console.log('SOPHIA DATA F', userData);

        const userThread = await ThreadModel.find({ owner_id: id }).sort({createdAt: -1});
        // console.log('sophiaTHread',userThread);
        // return NextResponse.json(userThread);
        const userThreadsWithUsername = userThread.map(thread => ({
            ...thread.toObject(),
            username: user_name, // Attach the username to the thread,
            fullname,
            profile_pic,
            userData
        }));
      
          // Send the response with the userThreadsWithUsername array
        return NextResponse.json(userThreadsWithUsername);

    } catch (error) {
        return NextResponse.json({
            message: error,
            success: "failed"
        })
    }
}
export async function PUT(request: NextRequest){
    try {
        const path = request.nextUrl.pathname.split('/api/%40');
        console.log(path);


        const reqBody = await request.json();
        const {payload} = reqBody;
        
        console.log('payloadIS CLICK', payload);

        const token = await getTokenData(request);
        // console.log('token' , token);
        if(!token){
            return NextResponse.json({
                message: "User Not Logged in ! No Token Found",
                success : "failed"
            })
        }

        const user = await UserModel.findOne({username : path[1]})
        // errorhandling
        if(!user){
            return NextResponse.json({
                message: "NO USER FOUND",
                success: "failed"
            },{status : 404})
        }
        
        
        // below line executes when user found or the above if condition failed
        const id = user._id;
        const userData = await UserModel.findOne({_id: token.id});

        const userWithFollowers = await UserModel.findByIdAndUpdate(id,{
            $push : {
                followers : userData._id
            }
        },{
            new : true,
        }).populate('followers').select('-password');

        const addFollowings = await UserModel.findByIdAndUpdate(token.id,{
            $push:{
                followings: user._id
            }
        },{
            new: true
        }).populate('followings').select('-password');

        return NextResponse.json(addFollowings)


    } catch (error) {
        return NextResponse.json({
            message: error,
            success: "failed"
        })
    }
}



export async function DELETE(request: NextRequest) {
    try {
        const path = request.nextUrl.pathname.split('/api/%40');
        const token = await getTokenData(request);

        if (!token) {
            return NextResponse.json({
                message: "User Not Logged in! No Token Found",
                success: "failed",
            });
        }

        const user = await UserModel.findOne({ username: path[1] });

        if (!user) {
            return NextResponse.json(
                {
                    message: "NO USER FOUND",
                    success: "failed",
                },
                { status: 404 }
            );
        }

        const id = user._id;
        const userData = await UserModel.findOne({ _id: token.id });

        // Remove the user's ID from the 'followers' array of the user being unfollowed
        await UserModel.findByIdAndUpdate(
            id,
            {
                $pull: {
                    followers: userData._id,
                },
            },
            { new: true }
        ).populate('followers').select('-password');

        // Remove the current user's ID from the 'followings' array of the user doing the unfollowing
        const removeFollowings = await UserModel.findByIdAndUpdate(
            token.id,
            {
                $pull: {
                    followings: id,
                },
            },
            { new: true }
        ).populate('followings').select('-password');

        return NextResponse.json(removeFollowings);
    } catch (error) {
        return NextResponse.json({
            message: error,
            success: "failed",
        });
    }
}