import {NextResponse} from 'next/server';
import {authClient} from '@/lib/supabase/server';
import {authConfigured} from '@/lib/supabase/config';
import {sameOrigin} from '@/lib/auth';
export async function POST(req:Request){
 if(!sameOrigin(req))return new Response('Sem autorização',{status:403});
 const fail=()=>NextResponse.redirect(new URL('/admin/login?erro=1',req.url),303);
 if(!authConfigured()||!process.env.ADMIN_EMAIL)return fail();
 try{if(Number(req.headers.get('content-length'))>4096)return fail();const form=await req.formData();const email=String(form.get('email')||'').trim(),password=String(form.get('password')||'');if(!email||email.length>254||!password||password.length>1024)return fail();
 const client=await authClient();const {data,error}=await client.auth.signInWithPassword({email,password});
 if(error||!data.user?.email_confirmed_at||data.user.email?.toLowerCase()!==process.env.ADMIN_EMAIL.trim().toLowerCase()){await client.auth.signOut();return fail()}
 return NextResponse.redirect(new URL('/admin',req.url),303);
 }catch{return fail()}
}
