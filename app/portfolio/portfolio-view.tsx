'use client';
import {defaultSettings,categoryKey,type SiteSettings} from '@/lib/site-content';
import {useState,useRef} from 'react';
import {motion,useReducedMotion} from 'framer-motion';
import {ArrowUpRight} from 'lucide-react';
import {Dialog,DialogContent,DialogTitle,DialogDescription} from '@/components/ui/dialog';
import {MotionDecor,useMotionSystem} from '../motion-system';
import {SiteHeader} from '../site-header';
import {PortfolioGallery} from '../portfolio-gallery';
import {ProjectStage} from '../project-stage';
import {projectMeta,type Project} from '@/lib/portfolio';
export default function PortfolioView({projects,settings=defaultSettings}:{projects:Project[];settings?:SiteSettings}){const [selected,setSelected]=useState<Project|null>(null);const reduced=useReducedMotion();const root=useRef<HTMLDivElement>(null);useMotionSystem(root,!!selected);return <div className="portfolio-page" ref={root}><MotionDecor/><SiteHeader home={false}/><main><motion.div className="portfolio-page-heading" initial={reduced?false:{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{duration:.8}}><p className="eyebrow">CRISORA / PORTFÓLIO</p><h1>Ideias que ganharam forma.</h1><p>Websites, identidades e comunicação. Explore cada área.</p></motion.div><PortfolioGallery projects={projects} onOpen={setSelected} settings={settings} full/></main><footer className="portfolio-page-footer"><p>O próximo projeto pode ser o seu.</p><a href="/#contacto">Vamos conversar <ArrowUpRight size={20}/></a></footer><Dialog open={!!selected} onOpenChange={v=>{if(!v)setSelected(null)}}><DialogContent className="project-modal">{selected&&<><div className="modal-stage"><ProjectStage project={selected} priority/></div><div className="modal-copy"><p className="eyebrow">{settings.categories.find(c=>c.id===categoryKey(selected))?.name||selected.category}</p><DialogTitle>{selected.title}</DialogTitle><DialogDescription>{selected.description}</DialogDescription><div className="modal-links">{selected.url&&<a href={selected.url} target="_blank" rel="noopener" className="animated-link">Abrir projeto <ArrowUpRight size={18}/></a>}<a className="animated-link" href="/#contacto">Quero conversar sobre um projeto <ArrowUpRight size={18}/></a></div></div></>}</DialogContent></Dialog></div>}
