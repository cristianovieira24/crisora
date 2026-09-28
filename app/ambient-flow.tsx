'use client';
import {useEffect,useRef} from 'react';
/** A single quiet field behind the story; no image filters touch the portfolio. */
export function AmbientFlow(){const ref=useRef<HTMLCanvasElement>(null);
useEffect(()=>{const canvas=ref.current;if(!canvas)return;const ctx=canvas.getContext('2d');if(!ctx)return;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');const coarse=matchMedia('(pointer: coarse)').matches;
let frame=0,last=0,time=0,w=1,h=1,visible=true;let x=.6,y=.4,tx=.6,ty=.4;
const resize=()=>{w=innerWidth;h=innerHeight;const ratio=Math.min(devicePixelRatio,coarse?1:1.25);canvas.width=Math.round(w*ratio);canvas.height=Math.round(h*ratio);ctx.setTransform(ratio,0,0,ratio,0,0)};
const draw=(now:number)=>{frame=0;if(document.hidden||!visible)return;if(now-last<(coarse?50:32)){frame=requestAnimationFrame(draw);return}const dt=Math.min((now-last)/1000,.06);last=now;time+=dt;x+=(tx-x)*.035;y+=(ty-y)*.035;ctx.clearRect(0,0,w,h);
const scroll=window.scrollY/Math.max(h,1);const phase=time*.14+scroll*.22;
for(let i=0;i<3;i++){const cx=w*(.2+i*.3+Math.sin(phase+i*2)*.18+(x-.5)*.08),cy=h*(.45+Math.cos(phase*.7+i)*.3+(y-.5)*.08);const r=Math.max(w,h)*(.48+i*.05);const g=ctx.createRadialGradient(cx,cy,0,cx,cy,r);g.addColorStop(0,i===1?'rgba(45,210,207,.09)':'rgba(105,89,252,.19)');g.addColorStop(.4,i===1?'rgba(45,210,207,.035)':'rgba(105,89,252,.06)');g.addColorStop(1,'rgba(4,16,44,0)');ctx.fillStyle=g;ctx.fillRect(0,0,w,h)}
if(!reduced.matches)frame=requestAnimationFrame(draw)};
const start=()=>{cancelAnimationFrame(frame);last=performance.now()-60;if(!document.hidden&&visible)frame=requestAnimationFrame(draw)};
const move=(e:PointerEvent)=>{tx=e.clientX/w;ty=e.clientY/h};const observer=new IntersectionObserver(([e])=>{visible=e.isIntersecting;start()});const content=document.getElementById('flow-content');if(content)observer.observe(content);
resize();start();window.addEventListener('resize',resize);window.addEventListener('pointermove',move,{passive:true});document.addEventListener('visibilitychange',start);reduced.addEventListener('change',start);
return()=>{cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('resize',resize);window.removeEventListener('pointermove',move);document.removeEventListener('visibilitychange',start);reduced.removeEventListener('change',start)};
},[]);return <canvas ref={ref} className="ambient-flow" aria-hidden="true"/>}
