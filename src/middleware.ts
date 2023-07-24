import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;  //or we can do : window.location.pathname
    const isPublicPath = path === '/login' || path ==='/signup';

    const token = request.cookies.get("token")?.value || ""  //accessing the token from cookies.

    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/home',request.nextUrl))  
    }
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login',request.nextUrl))  
    }

}

export const config = {
    matcher: ['/login']  // this are the routes where the middlewares are applied.
}