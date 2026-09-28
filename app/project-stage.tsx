'use client';
import {projectMeta,type Project} from '@/lib/portfolio';
/** Art-directed covers use original project assets; no embedded pages or remote runtime. */
export function ProjectStage({project,priority=false}:{project:Project;priority?:boolean}){
 const original=projectMeta[project.id]?.image===project.image;
 const kind=original?project.id:'art';
 if(original&&['rony','patricia','liliana'].includes(project.id))return <WebsiteSheet project={project} priority={priority}/>;
 return <div className={'project-stage cover-'+kind}>
 {kind==='crisora'?<><img className="cover-material" src="/assets/crisora-material-clean.95b886fb25.webp" alt="" loading={priority?'eager':'lazy'}/><img className="cover-wordmark" src="/assets/wordmark.92634bce5b.svg" alt="Crisora"/><span className="cover-footnote">IDENTIDADE EM TODAS AS DIMENSÕES.</span></>:<>
 <img className="cover-photo" src={project.image} alt={project.title} loading={priority?'eager':'lazy'} decoding="async" draggable={false}/>
 {kind==='rony'&&<div className="cover-type"><img src="/assets/rony-logo.3a10f55aab.svg" alt="Rony Móveis"/><span>Espaços para<br/>novas ideias.</span><small>WEBSITE & CATÁLOGO</small></div>}
 {kind==='patricia'&&<div className="cover-type"><small>HAIR & MAKEUP</small><span>Patrícia<br/><em>Pradera.</em></span><small>DEMONSTRAÇÃO DE WEBSITE</small></div>}
 {kind==='liliana'&&<div className="cover-type"><small>SOLICITADORIA</small><span>Liliana<br/>Pereira.</span><small>CONCEITO DE WEBSITE</small></div>}
 </>}
 </div>
}

function WebsiteSheet({project,priority=false}:{project:Project;priority?:boolean}){
const details:Record<string,{heading:string;description:string;action:string;nav:string[];place:string}>={
rony:{heading:'Seu espaço começa por uma boa escolha.',description:'Móveis para casa e escritório, cadeiras, estofados e projetos planejados.',action:'Explorar produtos',nav:['Produtos','Planejados','A loja'],place:'GOIÂNIA · CASA & ESCRITÓRIO'},
patricia:{heading:'A sua beleza, na sua forma.',description:'Produção de cabelo e maquilhagem pensada para pessoas, não para um catálogo.',action:'Marcar atendimento',nav:['Serviços','Portefólio','Sobre'],place:'COIMBRA · HAIR & MAKEUP'},
liliana:{heading:'Assuntos jurídicos pedem clareza.',description:'Acompanhamento próximo, informação compreensível e atenção ao que realmente importa.',action:'Expor o meu assunto',nav:['Sobre','Serviços','Contacto'],place:'SOLICITADORIA · GUIA, POMBAL'}};
const d=details[project.id];return <div className={'project-stage website-preview preview-'+project.id}>
<div className="site-toolbar" aria-hidden="true"><span><i/><i/><i/></span><p>{project.url.replace(/^https?:\/\//,'').replace(/\/$/,'')}</p></div>
<div className="site-preview-page"><div className="site-preview-nav">{project.id==='rony'?<img src="/assets/rony-logo.3a10f55aab.svg" alt="Rony Móveis"/>:<strong>{project.title}</strong>}<span>{d.nav.map(n=><i key={n}>{n}</i>)}</span></div><div className="site-preview-hero"><div><small>{d.place}</small><h4>{d.heading}</h4><p>{d.description}</p><span className="site-preview-cta">{d.action} ↗</span></div><img src={project.image} alt={'Imagem do website '+project.title} loading={priority?"eager":"lazy"} draggable={false}/></div><div className="site-preview-bottom"><span>{project.id==='rony'?'Do produto ao projeto':'Uma experiência pensada ao detalhe.'}</span><span>↓</span></div></div></div>}
