import {defaultSettings} from '@/lib/site-content';
import Experience from './experience';
import {getProjects,initialProjects,getSiteSettings} from '@/lib/projects';
export const dynamic='force-dynamic';
export default async function Page(){let projects=initialProjects;let settings=defaultSettings;try{projects=await getProjects();settings=await getSiteSettings()}catch(e){console.error('Portfolio unavailable',e)}return <Experience projects={projects} settings={settings}/>}
