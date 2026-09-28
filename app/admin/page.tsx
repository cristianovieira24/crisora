import {requireChatGPTUser} from '../chatgpt-auth';
import {getProjects,getSiteSettings,OWNER_EMAIL} from '@/lib/projects';
import Editor from './editor';
export const dynamic='force-dynamic';
export default async function Admin(){const user=await requireChatGPTUser('/admin');if(user.email.toLowerCase()!==OWNER_EMAIL)return <main className="admin"><h1>Acesso reservado.</h1><p>Esta área está disponível apenas para a conta responsável pela Crisora.</p><a href="/">Voltar ao site</a></main>;try{return <Editor initial={await getProjects(true)} settings={await getSiteSettings()}/>}catch{return <main className="admin"><h1>Portfólio indisponível.</h1><p>Não foi possível carregar os dados. Atualize a página para tentar novamente.</p><a href="/">Voltar ao site</a></main>}}
