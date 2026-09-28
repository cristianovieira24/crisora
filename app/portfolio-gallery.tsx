'use client';
import {availableCategories,selectedProjects,categoryKey,defaultSettings,type SiteSettings} from '@/lib/site-content';

import {useEffect,useState} from 'react';
import {motion,useReducedMotion} from 'framer-motion';
import {ArrowUpRight} from 'lucide-react';
import {Tabs,TabsList,TabsTrigger,TabsContent} from '@/components/ui/tabs';
import {ProjectStage} from './project-stage';
import {discipline,projectMeta,type Project} from '@/lib/portfolio';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function PortfolioGallery({projects,onOpen,full=false,settings=defaultSettings}:{settings?:SiteSettings;projects:Project[];onOpen:(p:Project)=>void;full?:boolean}){const categories=availableCategories(settings,projects);const [category,setCategory]=useState(categories[0]?.id||'websites');const reduced=useReducedMotion();useEffect(()=>{if(full){const c=new URLSearchParams(location.search).get('categoria');if(categories.some(p=>p.id===c))setCategory(c!)}},[full]);useEffect(()=>{const frame=requestAnimationFrame(()=>ScrollTrigger.refresh());return()=>cancelAnimationFrame(frame)},[category]);const shown=selectedProjects(projects,category,full);
return <Tabs value={category} onValueChange={setCategory} className="compact-portfolio"><TabsList className="portfolio-pills" aria-label="Categoria dos projetos">{categories.map(c=><TabsTrigger key={c.id} value={c.id}>{c.name}<span>{projects.filter(p=>categoryKey(p)===c.id).length}</span></TabsTrigger>)}</TabsList><TabsContent value={category}><div className="compact-project-grid" key={category}>{shown.map((p,i)=><motion.article key={p.id} className={'compact-project '+(discipline(p)==='Comunicação'?'social-project':'')} initial={reduced?false:{opacity:0,y:35}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}} transition={{duration:.7,delay:(i%2)*.08,ease:[.16,1,.3,1]}}><button className="compact-project-media" data-cursor="EXPLORAR" onClick={()=>onOpen(p)} aria-label={'Conhecer '+p.title}><ProjectStage project={p}/></button><div className="compact-project-caption"><div><p className="compact-project-category">{categories.find(c=>c.id===categoryKey(p))?.name||p.category}</p><h3>{p.title}</h3><p className="compact-project-description">{p.description}</p></div><button onClick={()=>onOpen(p)} aria-label={'Ver detalhes de '+p.title}><ArrowUpRight size={21}/></button></div></motion.article>)}</div>{shown.length===0&&<p className="portfolio-empty">Novos projetos em breve nesta área.</p>}</TabsContent>{!full&&<div className="portfolio-more"><a href={'/portfolio?categoria='+encodeURIComponent(category)} target="_blank" rel="noopener">Ver portfólio completo <ArrowUpRight size={20}/></a><p>Explore todos os projetos numa nova aba.</p></div>}</Tabs>}
