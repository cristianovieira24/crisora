import {createServerClient} from '@supabase/ssr';
import {NextResponse,type NextRequest} from 'next/server';
import {authConfigured} from './lib/supabase/config';
export async function proxy(request:NextRequest){
 let response=NextResponse.next({request});
 if(authConfigured()){
 const supabase=createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,{
 cookieOptions:{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/'},
 cookies:{getAll:()=>request.cookies.getAll(),setAll(values){values.forEach(({name,value})=>request.cookies.set(name,value));response=NextResponse.next({request});values.forEach(({name,value,options})=>response.cookies.set(name,value,options))}}
 });
 try{await supabase.auth.getUser()}catch{/* Routes still validate independently and fail closed. */}
 }
 response.headers.set('Cache-Control','private, no-store');return response;
}
export const config={matcher:['/admin/:path*','/api/:path*']};
