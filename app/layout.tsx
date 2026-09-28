import type {Metadata} from 'next';
import './globals.css';
import './narrative.css';
import './portfolio-layout.css';
export const metadata:Metadata={title:'Crisora — A sua marca, à altura do seu valor.',description:'Sites, identidade visual e comunicação. A Crisora dá forma ao valor do seu negócio. Brasil e Portugal.',icons:{icon:'/favicon.svg'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="pt"><body>{children}</body></html>}
