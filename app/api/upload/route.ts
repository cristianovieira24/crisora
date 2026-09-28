import {getAdmin,sameOrigin} from '@/lib/auth';
import {adminClient,MEDIA_BUCKET} from '@/lib/supabase/admin';
// File bytes go directly to Storage, avoiding Vercel's function payload limit.
export async function POST(req:Request){
 if(!await getAdmin()||!sameOrigin(req))return new Response('Sem autorização',{status:403});
 try{if(Number(req.headers.get('content-length'))>2048)return new Response('Pedido demasiado grande',{status:413});
 const {type,size}=await req.json();if(!['image/png','image/jpeg','image/webp'].includes(type)||!Number.isInteger(size)||size<=0||size>8*1024*1024)return Response.json({error:'Use JPG, PNG ou WebP até 8 MB.'},{status:400});
 const path=crypto.randomUUID();const {data,error}=await adminClient().storage.from(MEDIA_BUCKET).createSignedUploadUrl(path,{upsert:false});if(error||!data)throw error;
 return Response.json({path,token:data.token,bucket:MEDIA_BUCKET,url:process.env.NEXT_PUBLIC_SUPABASE_URL,key:process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,image:'/media/'+path},{headers:{'Cache-Control':'no-store'}});
 }catch{return Response.json({error:'Não foi possível preparar o upload. Tente novamente.'},{status:503})}
}
