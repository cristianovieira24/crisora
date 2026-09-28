const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),ts=require('typescript');
const root=path.resolve(__dirname,'..');
function loader(mocks={}){const cache={};function load(file){file=path.resolve(root,file);if(cache[file])return cache[file].exports;const m={exports:{}};cache[file]=m;const code=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;function local(p){if(p in mocks)return mocks[p];if(p==='server-only')return {};if(p.startsWith('@/'))return load(p.slice(2)+'.ts');if(p.startsWith('.'))return load(path.resolve(path.dirname(file),p)+'.ts');return require(p)}new Function('require','module','exports',code)(local,m,m.exports);return m.exports}return load}
const request=(body,origin='https://crisora.test')=>new Request('https://crisora.test/api/test',{method:'POST',headers:{origin,'Content-Type':'application/json'},body:JSON.stringify(body)});
test('CMS preserves categories, six featured items, drafts and authorization',async()=>{
 let owner=true,config;const records=new Map();
 const load=loader({'@/lib/auth':{getAdmin:async()=>owner?{id:'owner'}:null,sameOrigin:r=>r.headers.get('origin')===new URL(r.url).origin},'@/lib/projects':{getProjects:async(all=false)=>[...records.values()].filter(p=>all||p.published),getSiteSettings:async()=>config,saveSettings:async s=>config=s,saveProject:async p=>records.set(p.id,p)}});
 const content=load('lib/site-content.ts');config=structuredClone(content.defaultSettings);config.websiteProject='';config.identityProject='';config.socialProjects=[];
 const settings=load('app/api/settings/route.ts'),projects=load('app/api/projects/route.ts');config.categories.push({id:'motion',name:'Motion'});
 assert.equal((await settings.POST(request(config))).status,200);
 for(let i=0;i<9;i++)assert.equal((await projects.POST(request({id:'demo-'+i,title:'Demo '+i,category:'motion',description:'Demo',image:'/media/test-image',url:'',position:i,published:i===8?0:1,featured:i===0?0:1}))).status,200);
 const all=[...records.values()];assert.equal(content.selectedProjects(all,'motion').length,6);assert.equal(content.selectedProjects(all,'motion',true).length,8);assert.equal(records.get('demo-1').image,'/media/test-image');
 assert.equal((await settings.POST(request({...config,categories:config.categories.filter(c=>c.id!=='motion')}))).status,400);
 assert.equal((await settings.POST(request(config,'https://other.test'))).status,403);owner=false;
 assert.equal((await projects.POST(request({}))).status,403);assert.equal((await settings.POST(request(config))).status,403);
});
test('administrator requires server-verified, confirmed identity matching configured email',async()=>{
 process.env.ADMIN_EMAIL='owner@example.test';let user=null,error=null;
 const load=loader({'./supabase/config':{authConfigured:()=>true},'./supabase/server':{authClient:async()=>({auth:{getUser:async()=>({data:{user},error})}})},'next/navigation':{redirect:()=>{throw Error('redirect')}}});
 const auth=load('lib/auth.ts');assert.equal(await auth.getAdmin(),null);
 user={email:'other@example.test',email_confirmed_at:'now'};assert.equal(await auth.getAdmin(),null);
 user={email:'owner@example.test'};assert.equal(await auth.getAdmin(),null);
 user.email_confirmed_at='now';assert.equal((await auth.getAdmin()).email,user.email);
 error={message:'Revoked token'};assert.equal(await auth.getAdmin(),null);delete process.env.ADMIN_EMAIL;
});
test('uploads require owner, same origin and valid size before signing',async()=>{
 let owner=false,signatures=0;
 const load=loader({'@/lib/auth':{getAdmin:async()=>owner?{}:null,sameOrigin:r=>r.headers.get('origin')===new URL(r.url).origin},'@/lib/supabase/admin':{MEDIA_BUCKET:'crisora-media',adminClient:()=>({storage:{from:()=>({createSignedUploadUrl:async()=>{signatures++;return {data:{token:'test-only'}}}})}})}});
 const api=load('app/api/upload/route.ts');assert.equal((await api.POST(request({type:'image/webp',size:100}))).status,403);owner=true;
 assert.equal((await api.POST(request({type:'image/webp',size:100},'https://other.test'))).status,403);
 assert.equal((await api.POST(request({type:'image/svg+xml',size:100}))).status,400);
 assert.equal((await api.POST(request({type:'image/png',size:9*1024*1024}))).status,400);assert.equal(signatures,0);
 const result=await api.POST(request({type:'image/webp',size:100}));assert.equal(result.status,200);const body=await result.json();assert.match(body.image,/^\/media\/[\w-]+$/);assert.equal(signatures,1);
});
