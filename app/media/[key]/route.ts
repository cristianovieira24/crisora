import {adminClient,MEDIA_BUCKET} from '@/lib/supabase/admin';
export const dynamic='force-dynamic';
export async function GET(_req:Request,{params}:{params:Promise<{key:string}>}){
 const {key}=await params;if(!/^[\w-]{1,100}$/.test(key))return new Response('Não encontrado',{status:404});
 try{const {data,error}=await adminClient().storage.from(MEDIA_BUCKET).createSignedUrl(key,120);if(error||!data)return new Response('Não encontrado',{status:404});
 return new Response(null,{status:307,headers:{Location:data.signedUrl,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
 }catch{return new Response('Indisponível',{status:503})}
}
