import {NextResponse} from 'next/server';
import {authClient} from '@/lib/supabase/server';
import {sameOrigin} from '@/lib/auth';
export async function POST(req:Request){if(!sameOrigin(req))return new Response('Sem autorização',{status:403});await(await authClient()).auth.signOut();return NextResponse.redirect(new URL('/admin/login',req.url),303)}
