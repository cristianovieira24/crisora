import {requireAdmin} from '@/lib/auth';
import {getProjects,getSiteSettings} from '@/lib/projects';
import Editor from './editor';
export const dynamic='force-dynamic';
export default async function Admin(){await requireAdmin();try{const [projects,settings]=await Promise.all([getProjects(true),getSiteSettings()]);return <><form action="/api/auth/logout" method="post" style={{position:'absolute',top:14,right:24,zIndex:10}}><button type="submit">Sair do painel</button></form><Editor initial={projects} settings={settings}/></>}catch{return <main className="admin"><h1>Não foi possível abrir o painel.</h1><p>Verifique a configuração do banco de dados e tente novamente.</p><a href="/">Voltar ao site</a></main>}}
