'use client';
import {useLayoutEffect,useRef,type RefObject} from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';
import {setupNarrative} from './scroll-narrative';

gsap.registerPlugin(ScrollTrigger);
export function useMotionSystem(root:RefObject<HTMLDivElement|null>,paused:boolean){const lenisRef=useRef<Lenis|null>(null);
useLayoutEffect(()=>{const site=root.current;if(!site)return;const media=gsap.matchMedia();let lenis:Lenis|undefined;let refreshFrame=0;let disposed=false;const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const context=gsap.context(()=>{
 if(reduced){gsap.set('.intro-curtain',{display:'none'});return;}
 lenis=new Lenis({lerp:.09,smoothWheel:true,syncTouch:false,anchors:true,prevent:node=>node.hasAttribute('data-lenis-prevent')});lenisRef.current=lenis;
 const update=(time:number)=>lenis?.raf(time*1000);lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(update);gsap.ticker.lagSmoothing(0);
 gsap.to('.intro-curtain',{yPercent:-100,duration:.7,ease:'power3.inOut',onComplete:()=>gsap.set('.intro-curtain',{display:'none'})});
 setupNarrative(site,media,lenis);
 gsap.utils.toArray<HTMLElement>('.split-title:not(.hero-title)').forEach(title=>{gsap.from(title.querySelectorAll('.line-inner'),{yPercent:110,rotate:.6,duration:1.25,stagger:.045,ease:'power4.out',scrollTrigger:{trigger:title,start:'top 88%',once:true}})});
 gsap.utils.toArray<HTMLElement>('[data-media-reveal]').forEach(el=>{const inside=el.querySelector('[data-media-inner]');const tl=gsap.timeline({scrollTrigger:{trigger:el,start:'top 87%',once:true}});tl.from(el,{clipPath:'inset(100% 0% 0% 0%)',duration:1.15,ease:'power4.inOut'});if(inside)tl.from(inside,{scale:1.16,duration:1.45,ease:'power4.out'},0)});
 const studio=site.querySelector('.studio');
 if(studio){const studioReveal=gsap.timeline({scrollTrigger:{trigger:studio,start:'top 76%',once:true}});
 studioReveal.from('.studio-identity img',{y:24,opacity:0,duration:1,ease:'power3.out'})
 .from('.studio-words b',{yPercent:112,duration:1.15,stagger:.13,ease:'power4.out'},.18);}
 // Lower sections reveal independently; the approved opening and chapters are untouched.
 gsap.utils.toArray<HTMLElement>('.studio-copy>p:not(.eyebrow),.process-steps article,.faq article,.contact-grid>div,.contact form,.compact-footer').forEach((el)=>{gsap.from(el,{y:32,opacity:0,duration:.85,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 91%',once:true}})});
 media.add('(pointer: fine) and (prefers-reduced-motion: no-preference)',()=>{
 const position=site.querySelector<HTMLElement>('.cursor-position'),ring=site.querySelector<HTMLElement>('.cursor-ring'),dot=site.querySelector<HTMLElement>('.cursor-dot'),label=site.querySelector<HTMLElement>('.cursor-label');
 if(!position||!ring||!dot||!label)return;
 // Position belongs to a separate node, so hover-size tweens cannot cancel movement.
 gsap.set([ring,dot],{xPercent:-50,yPercent:-50});
 let magnetic:HTMLElement|null=null,oldTarget:Element|null=null;let appearanceReady=false;let oldTone="";
 const resetMagnetic=()=>{if(magnetic)gsap.to(magnetic,{x:0,y:0,duration:.35,overwrite:'auto'});magnetic=null};
 const leave=()=>{site.classList.remove('custom-pointer');position.style.visibility='hidden';oldTarget=null;appearanceReady=false;resetMagnetic()};
 const move=(e:PointerEvent)=>{
  if(e.pointerType!=='mouse'){leave();return}
  const element=e.target instanceof Element?e.target:null;
  if(!element||!site.contains(element)||element.closest('[role="dialog"],.project-universe,input,textarea,select,[contenteditable="true"]')){leave();return}
  position.style.transform=`translate3d(${e.clientX}px,${e.clientY}px,0)`;
  position.style.visibility='visible';site.classList.add('custom-pointer');
  const target=element.closest('button,a,[data-cursor]');
  const light=!!element.closest('.project-library,.portfolio-page main,.identity-letters');const tone=light?'#04102c':'#f7f6f4';
  // Initialise even when first entering plain text.
  if(!appearanceReady||target!==oldTarget||tone!==oldTone){appearanceReady=true;oldTone=tone;
   oldTarget=target;const text=target?.getAttribute('data-cursor')||'';label.textContent=text;
   gsap.to(ring,{width:text?106:target?58:34,height:text?106:target?58:34,backgroundColor:text?'#6959fc':'transparent',borderColor:text?'#6959fc':tone,duration:.2,overwrite:'auto'});
   gsap.set(dot,{backgroundColor:tone});gsap.set(label,{color:'#ffffff'});gsap.set([ring,dot],{opacity:1});gsap.to(dot,{scale:text?0:1,duration:.15,overwrite:'auto'});
  }
  const mag=element.closest<HTMLElement>('[data-magnetic]');
  if(magnetic&&mag!==magnetic)resetMagnetic();magnetic=mag;
  if(mag){const r=mag.getBoundingClientRect();gsap.to(mag,{x:(e.clientX-r.left-r.width/2)*.14,y:(e.clientY-r.top-r.height/2)*.14,duration:.35,ease:'power3.out',overwrite:'auto'})}
 };
 const onVisibility=()=>{if(document.hidden)leave()};
 window.addEventListener('pointermove',move,{passive:true});document.documentElement.addEventListener('pointerleave',leave);window.addEventListener('blur',leave);document.addEventListener('visibilitychange',onVisibility);
 const tiltCleanup: (()=>void)[]=[];site.querySelectorAll<HTMLElement>('[data-tilt]').forEach(el=>{const inner=el.querySelector<HTMLElement>('[data-tilt-inner]');if(!inner)return;const onMove=(e:PointerEvent)=>{const r=el.getBoundingClientRect();gsap.to(inner,{rotateY:(e.clientX-r.left-r.width/2)/r.width*4,rotateX:-(e.clientY-r.top-r.height/2)/r.height*4,transformPerspective:1300,duration:.6,ease:'power3.out',overwrite:true})};const onLeave=()=>gsap.to(inner,{rotateX:0,rotateY:0,duration:.8,ease:'power3.out',overwrite:true});el.addEventListener('pointermove',onMove);el.addEventListener('pointerleave',onLeave);tiltCleanup.push(()=>{el.removeEventListener('pointermove',onMove);el.removeEventListener('pointerleave',onLeave);gsap.set(inner,{clearProps:'transform'})})});const distort=site.querySelector<SVGFEDisplacementMapElement>('#hover-displacement');const waveClean: (()=>void)[]=[];site.querySelectorAll<HTMLElement>('[data-wave]').forEach(el=>{const on=()=>{el.classList.add('wave-active');if(distort)gsap.to(distort,{attr:{scale:5},duration:.7,ease:'sine.out'})};const off=()=>{if(distort)gsap.to(distort,{attr:{scale:0},duration:.5,onComplete:()=>el.classList.remove('wave-active')})};el.addEventListener('pointerenter',on);el.addEventListener('pointerleave',off);waveClean.push(()=>{el.removeEventListener('pointerenter',on);el.removeEventListener('pointerleave',off)})});return()=>{window.removeEventListener('pointermove',move);document.documentElement.removeEventListener('pointerleave',leave);window.removeEventListener('blur',leave);document.removeEventListener('visibilitychange',onVisibility);leave();tiltCleanup.forEach(f=>f());waveClean.forEach(f=>f())}});
 const refresh=()=>{if(disposed)return;cancelAnimationFrame(refreshFrame);refreshFrame=requestAnimationFrame(()=>{lenis?.resize();ScrollTrigger.refresh()})};document.fonts.ready.then(refresh);window.addEventListener('load',refresh,{once:true});refresh();return()=>{window.removeEventListener('load',refresh);cancelAnimationFrame(refreshFrame);gsap.ticker.remove(update);lenis?.destroy();lenisRef.current=null};
},site);return()=>{disposed=true;media.revert();context.revert()};},[root]);
useLayoutEffect(()=>{if(paused){lenisRef.current?.stop();root.current?.classList.remove('custom-pointer');const cursor=root.current?.querySelector<HTMLElement>('.cursor-position');if(cursor)cursor.style.visibility='hidden'}else lenisRef.current?.start()},[paused]);
return lenisRef;}
export function MotionDecor(){return <><div className="intro-curtain" aria-hidden="true"><img src="/assets/wordmark.92634bce5b.svg" alt=""/><span>IDENTIDADE · WEBSITES · COMUNICAÇÃO</span></div><div className="cursor-position" aria-hidden="true"><div className="cursor-ring"><span className="cursor-label"/></div><div className="cursor-dot"/></div><svg className="motion-filters" aria-hidden="true"><defs><filter id="media-wave" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.009 0.014" numOctaves="1" seed="5" result="wave"/><feDisplacementMap id="hover-displacement" in="SourceGraphic" in2="wave" scale="0" xChannelSelector="R" yChannelSelector="G"/></filter></defs></svg></>}
export function RevealTitle({lines,className='',hero=false}:{lines:string[];className?:string;hero?:boolean}){const words=lines.join(' ');const content=lines.map((line,i)=><span className="line-mask" aria-hidden="true" key={line}><span className="line-inner">{line.split(' ').map((word,j)=><span className="title-word" key={j}>{word}{j<line.split(' ').length-1?' ':''}</span>)}</span></span>);return hero?<h1 className={'split-title hero-title '+className} aria-label={words}>{content}</h1>:<h2 className={'split-title '+className} aria-label={words}>{content}</h2>}
