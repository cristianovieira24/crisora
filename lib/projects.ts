import 'server-only';
import {initialProjects,currentProjectImage,type Project} from './portfolio';
import {defaultSettings,settingsSchema,type SiteSettings} from './site-content';
import {adminClient} from './supabase/admin';
import {backendConfigured} from './supabase/config';
export {initialProjects,type Project} from './portfolio';
export async function getProjects(all=false){
 if(!backendConfigured()){if(all)throw new Error('Banco não configurado.');return initialProjects.filter(p=>p.published)}
 const {data,error}=await adminClient().from('projects').select('*').order('position').order('title');if(error)throw error;
 const merged=new Map(initialProjects.map(p=>[p.id,p]));for(const p of (data||[]) as Project[])merged.set(p.id,{...p,image:currentProjectImage(p.image)});
 return [...merged.values()].filter(p=>all||p.published).sort((a,b)=>a.position-b.position);
}
export async function getSiteSettings():Promise<SiteSettings>{
 if(!backendConfigured())return defaultSettings;
 const {data,error}=await adminClient().from('site_settings').select('value').eq('id','main').maybeSingle();if(error)throw error;
 if(!data)return defaultSettings;
 return settingsSchema.parse({...defaultSettings,...data.value,text:{...defaultSettings.text,...data.value.text}});
}
export async function saveProject(project:Project){const {error}=await adminClient().from('projects').upsert(project,{onConflict:'id'});if(error)throw error}
export async function saveSettings(settings:SiteSettings){const {error}=await adminClient().from('site_settings').upsert({id:'main',value:settings},{onConflict:'id'});if(error)throw error}
