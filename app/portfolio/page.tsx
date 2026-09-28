import {defaultSettings} from '@/lib/site-content';
import type {Metadata} from 'next';
import {getProjects,initialProjects,getSiteSettings} from '@/lib/projects';
import PortfolioView from './portfolio-view';
export const dynamic='force-dynamic';
export const metadata:Metadata={title:'Portfólio — Crisora',description:'Explore os projetos de websites, identidade visual e comunicação digital da Crisora.'};
export default async function Page(){let projects=initialProjects;let settings=defaultSettings;try{projects=await getProjects();settings=await getSiteSettings()}catch(e){console.error('Portfolio unavailable',e)}return <PortfolioView projects={projects} settings={settings}/>}
