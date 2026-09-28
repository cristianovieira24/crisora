import {env} from 'cloudflare:workers';
import {initialProjects,currentProjectImage,type Project} from './portfolio';
export {initialProjects,type Project} from './portfolio';
export function db(){return (env as unknown as {DB:D1Database}).DB}
export function bucket(){return (env as unknown as {BUCKET:R2Bucket}).BUCKET}
export async function getProjects(all=false){const r=await db().prepare('SELECT * FROM projects ORDER BY position, title').all<Project>();const merged=new Map(initialProjects.map(p=>[p.id,p]));for(const p of r.results)merged.set(p.id,{...p,image:currentProjectImage(p.image)});return [...merged.values()].filter(p=>all||p.published).sort((a,b)=>a.position-b.position)}
export const OWNER_EMAIL='creastezgin123@gmail.com';

export async function getSiteSettings(){const {defaultSettings}=await import('./site-content');const row=await db().prepare('SELECT value FROM site_settings WHERE id = ?').bind('main').first<{value:string}>();return row?{...defaultSettings,...JSON.parse(row.value),text:{...defaultSettings.text,...JSON.parse(row.value).text}}:defaultSettings}
