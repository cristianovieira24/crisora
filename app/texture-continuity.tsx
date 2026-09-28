'use client';
import {useEffect,useRef} from 'react';
import {LivingSurface} from './living-surface';

export function TextureContinuity({src="/assets/immersive-flow.1ebc43f150.webp"}:{src?:string}){
 const motion=useRef<HTMLDivElement>(null);
 useEffect(()=>{const el=motion.current;if(!el||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 let frame=0,time=0,last=0,x=0,y=0,tx=0,ty=0;
 const tick=(now:number)=>{const dt=Math.min((now-last)/1000,.05);last=now;time+=dt;const ease=1-Math.exp(-dt*3.5);x+=(tx-x)*ease;y+=(ty-y)*ease;
 el.style.transform=`translate3d(${x*20+Math.sin(time*.23)*9}px,${y*15+Math.cos(time*.19)*7}px,0) scale(1.08)`;
 frame=requestAnimationFrame(tick)};
 const resume=()=>{cancelAnimationFrame(frame);if(!document.hidden){last=performance.now();frame=requestAnimationFrame(tick)}};
 const move=(e:PointerEvent)=>{if(e.pointerType==='mouse'){tx=e.clientX/innerWidth-.5;ty=e.clientY/innerHeight-.5}};
 resume();window.addEventListener('pointermove',move,{passive:true});document.addEventListener('visibilitychange',resume);
 return()=>{cancelAnimationFrame(frame);window.removeEventListener('pointermove',move);document.removeEventListener('visibilitychange',resume)};
 },[]);
 return <div className="texture-continuity" style={{backgroundImage:`url("${src}")`}} aria-hidden="true"><div ref={motion} className="texture-motion" style={{backgroundImage:`url("${src}")`}}><LivingSurface src={src} priority={false} fluid/></div><div className="texture-shade"/></div>;
}
