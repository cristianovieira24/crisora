import 'server-only';
import {createClient} from '@supabase/supabase-js';
export const MEDIA_BUCKET='crisora-media';
export function adminClient(){
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SECRET_KEY;
 if(!url||!key)throw new Error('Configure Supabase antes de editar o conteúdo.');
 return createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false},global:{fetch:(input,init)=>fetch(input,{...init,cache:'no-store'})}});
}
