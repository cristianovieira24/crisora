import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import type Lenis from 'lenis';
/** Adds progressive enhancement only. All content remains in document order without motion. */
export function setupNarrative(site:HTMLElement,media:gsap.MatchMedia,lenis:Lenis){
media.add('(min-width: 700px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)',()=>{
const opening=site.querySelector<HTMLElement>('.reveal-opening');if(!opening)return;opening.classList.add('opening-directed');
const tl=gsap.timeline({scrollTrigger:{trigger:opening,start:'top top',end:()=>'+='+innerHeight*1.05,pin:true,scrub:.8,anticipatePin:1,invalidateOnRefresh:true},defaults:{ease:'power2.inOut'}});
tl.fromTo(opening.querySelector('.living-surface'),{clipPath:'circle(0% at 50% 50%)',scale:1.18},{clipPath:'circle(85% at 50% 50%)',scale:1,duration:1},0)
.to(opening.querySelector('.opening-mark'),{scale:.6,autoAlpha:0,duration:.25},.05)
.fromTo(opening.querySelectorAll('h1 i'),{yPercent:120},{yPercent:0,duration:.45,stagger:.09},.28)
.fromTo(opening.querySelector('.opening-label'),{autoAlpha:0,y:15},{autoAlpha:1,y:0,duration:.25},.3)
.fromTo(opening.querySelector('.opening-subtitle'),{autoAlpha:0,y:18},{autoAlpha:1,y:0,duration:.25},.72)
.to({}, {duration:.15});
return()=>{opening.classList.remove('opening-directed');tl.scrollTrigger?.kill();tl.kill()};
});
// On phones, keep native touch scrolling and reveal without a pinned viewport.
media.add('(max-width: 699px) and (prefers-reduced-motion: no-preference)',()=>{
 const opening=site.querySelector('.reveal-opening');if(!opening)return;
 const tl=gsap.timeline({delay:.45,defaults:{ease:'power4.out'}});
 tl.from(opening.querySelectorAll('h1 i'),{yPercent:110,duration:1.15,stagger:.12})
 .from(opening.querySelectorAll('.opening-label,.opening-subtitle'),{opacity:0,y:18,duration:.9,stagger:.1},.3);
 return()=>{tl.kill()};
});
media.add('(min-width: 1000px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)',()=>{
const section=site.querySelector<HTMLElement>('.service-journey');if(!section)return;const scenes=Array.from(section.querySelectorAll<HTMLElement>('.journey-scene'));const buttons=Array.from(section.querySelectorAll<HTMLButtonElement>('[data-chapter-nav]'));section.classList.add('is-directed');let last=-1;
function activate(i:number){if(i===last)return;last=i;scenes.forEach((el,n)=>{el.inert=n!==i;el.setAttribute('aria-hidden',String(n!==i))});buttons.forEach((b,n)=>b.setAttribute('aria-current',String(n===i)))}
const tl=gsap.timeline({scrollTrigger:{trigger:section,start:'top top',end:()=>'+='+innerHeight*3.8,pin:true,scrub:.75,anticipatePin:1,invalidateOnRefresh:true,onUpdate:self=>activate(Math.min(2,Math.floor(self.progress*3)))} });
gsap.set(scenes,{autoAlpha:0});
scenes.forEach((scene,i)=>{const start=i*3;tl.set(scene,{autoAlpha:1},start)
.fromTo(scene.querySelectorAll('.chapter-title i'),{yPercent:115},{yPercent:0,stagger:.1,duration:.65,ease:'power4.out'},start+.05)
.fromTo(scene.querySelector('.chapter-kicker'),{opacity:0,y:15},{opacity:1,y:0,duration:.35},start+.1)
.fromTo(scene.querySelectorAll('.story-piece'),{y:80,scale:.92,clipPath:'inset(100% 0 0 0)'},{y:0,scale:1,clipPath:'inset(0% 0 0 0)',duration:.9,stagger:.14,ease:'power3.out'},start+.35)
.fromTo(scene.querySelectorAll('.chapter-description,.chapter-deliverables,.chapter-cta,.chapter-example'),{opacity:0,y:20},{opacity:1,y:0,duration:.5,stagger:.1,ease:'power3.out'},start+.7);
if(i<scenes.length-1)tl.to(scene,{autoAlpha:0,y:-35,duration:.3,ease:'power2.in'},start+2.7);else tl.to({}, {duration:.4},8.6);
});activate(0);
const removers=buttons.map((b,i)=>{const fn=()=>{const st=tl.scrollTrigger;if(st)lenis.scrollTo(st.start+(st.end-st.start)*(i+.5)/3,{duration:1.1,lerp:0,force:true})};b.addEventListener('click',fn);return()=>b.removeEventListener('click',fn)});
return()=>{removers.forEach(f=>f());scenes.forEach(el=>{el.inert=false;el.removeAttribute('aria-hidden')});buttons.forEach(b=>b.removeAttribute('aria-current'));section.classList.remove('is-directed');tl.scrollTrigger?.kill();tl.kill()};
});
media.add('(max-width: 999px), (max-height: 759px)',()=>{
site.querySelectorAll<HTMLElement>('.journey-scene').forEach(scene=>{gsap.from(scene.querySelectorAll('.chapter-title i'),{yPercent:110,stagger:.1,ease:'power3.out',scrollTrigger:{trigger:scene.querySelector('.chapter-copy'),start:'top 85%',end:'top 35%',scrub:.5}});gsap.from(scene.querySelectorAll('.story-piece'),{y:45,clipPath:'inset(100% 0 0 0)',stagger:.1,ease:'power3.out',scrollTrigger:{trigger:scene.querySelector('.chapter-visual'),start:'top 88%',end:'top 35%',scrub:.5}})});
});
}
