'use client';
import {useRef,useState} from 'react';
import {motion,useReducedMotion} from 'framer-motion';
import {ArrowLeft,ArrowRight,ArrowUpRight} from 'lucide-react';
import {ProjectStage} from './project-stage';
import {discipline,type Project} from '@/lib/portfolio';
export function ProjectUniverse({projects,onOpen}:{projects:Project[];onOpen:(p:Project)=>void}){
 const [active,setActive]=useState(()=>Math.max(0,projects.findIndex(p=>p.id==='crisora')));const dragged=useRef(0);const region=useRef<HTMLDivElement>(null);const reduce=useReducedMotion();const total=projects.length;
 if(!total)return null;
 const select=(i:number,focus=false)=>{setActive((i+total)%total);if(focus)requestAnimationFrame(()=>region.current?.querySelector<HTMLButtonElement>('[data-active="true"]')?.focus({preventScroll:true}))};const index=active%total;const current=projects[index];
 return <div className="project-universe" ref={region} role="region" aria-label="Galeria de projetos" aria-roledescription="carrossel" onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();select(index+1,true)}if(e.key==='ArrowLeft'){e.preventDefault();select(index-1,true)}}}>
 <div className="universe-heading"><span>UNIVERSO CRISORA</span><span>{String(index+1).padStart(2,'0')} / {String(total).padStart(2,'0')}</span></div>
 <motion.div className="orbit-deck" drag="x" dragConstraints={{left:0,right:0}} dragElastic={.13} onDragStart={()=>{dragged.current=Infinity}} onDragEnd={(_,info)=>{if(info.offset.x < -35||info.velocity.x < -300)select(index+1);else if(info.offset.x>35||info.velocity.x>300)select(index-1);dragged.current=performance.now()+250}}>
 {projects.map((p,i)=>{let d=(i-index+total)%total;if(d>total/2)d-=total;const distance=Math.abs(d);return <motion.button key={p.id} className="orbit-project" data-active={d===0} aria-label={'Explorar '+p.title} tabIndex={d===0?0:-1} aria-hidden={distance>1} initial={false} animate={{x:`${d*62}%`,y:distance*14,scale:Math.max(.3,1-distance*.13),rotateY:reduce?0:-d*13,rotateZ:reduce?0:d*3,opacity:distance>2?0:1-distance*.2,z: -distance*100}} style={{zIndex:total-distance,pointerEvents:distance>1?'none':'auto'}} transition={{duration:reduce?0:.85,ease:[.16,1,.3,1]}} onClick={()=>{if(performance.now()<dragged.current)return;if(d!==0)select(i);else onOpen(p)}}><ProjectStage project={p} priority={i===index}/><span className="orbit-open"><ArrowUpRight size={20}/></span></motion.button>})}
 </motion.div>
 <div className="universe-caption"><div aria-live="polite" aria-atomic="true"><span>{discipline(current)}</span><button onClick={()=>onOpen(current)}>{current.title} <ArrowUpRight size={17}/></button></div><div className="universe-arrows"><button aria-label="Projeto anterior" onClick={()=>select(index-1)}><ArrowLeft size={19}/></button><button aria-label="Próximo projeto" onClick={()=>select(index+1)}><ArrowRight size={19}/></button></div></div>
 <p className="universe-hint">Arraste para explorar · Clique para conhecer</p>
 </div>
}
