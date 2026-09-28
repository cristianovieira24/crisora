import 'server-only';
import {redirect} from 'next/navigation';
import {authClient} from './supabase/server';
import {authConfigured} from './supabase/config';
export async function getAdmin(){
 if(!authConfigured()||!process.env.ADMIN_EMAIL)return null;
 try{const {data:{user},error}=await(await authClient()).auth.getUser();
 return !error&&user?.email_confirmed_at&&user.email?.toLowerCase()===process.env.ADMIN_EMAIL.trim().toLowerCase()?user:null;
 }catch{return null}
}
export async function requireAdmin(){const user=await getAdmin();if(!user)redirect('/admin/login');return user}
export function sameOrigin(req:Request){const origin=req.headers.get('origin');return !!origin&&origin===new URL(req.url).origin}
