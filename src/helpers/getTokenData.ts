import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export async function getTokenData(request : NextRequest){

    try {
        const token = request.cookies.get('token')?.value || "";
        const decodedToken: any = jwt.verify(token,process.env.TOKEN_SECRET!)

        return decodedToken;
    } catch (err:any) {
        throw new Error(err.message)
    }

}