# Crisora

Site institucional e portfólio da Crisora: identidade visual, websites e comunicação digital.

## Estado desta versão

Código completo da versão publicada, incluindo imagens, fontes locais, animações, painel de conteúdo, categorias e seleção de até seis projetos em destaque por categoria.

O repositório guarda o código-fonte. **Esta versão ainda não é uma implantação compatível com Vercel ou GitHub Pages.** O site atual continua disponível em https://crisora-design.creastezgin123.chatgpt.site/.

## Tecnologia

React, TypeScript, Vinext/Vite, Tailwind CSS, GSAP/ScrollTrigger, Lenis e Framer Motion. Fundo interativo em WebGL com imagem alternativa.

## Dependências da hospedagem atual

- Banco Cloudflare D1 (`DB`): projetos, categorias e conteúdo editável.
- Armazenamento Cloudflare R2 (`BUCKET`): uploads de imagens.
- Autenticação do painel fornecida pela hospedagem Sites/ChatGPT.
- O arquivo `.openai/hosting.json` identifica o projeto de origem; não contém credenciais.

**Não publique esta versão diretamente em outro provedor confiando nos cabeçalhos `oai-authenticated-*`.** Fora da hospedagem original, a autenticação precisa ser substituída por sessões verificadas no servidor antes de habilitar a edição.

## Desenvolvimento

Node.js >=22.13 e pnpm (versão em `package.json`).

```sh
pnpm install --frozen-lockfile
pnpm dev
```

O ambiente local utiliza bindings simulados de D1/R2. O painel precisa de configuração de autenticação para o proprietário; a identidade de teste local não é a conta administradora de produção. Migrações do banco estão em `drizzle/`.

## Próxima etapa: Vercel

1. Adaptar a execução para Next.js na Vercel.
2. Substituir os bindings D1/R2 por banco e armazenamento configurados para essa hospedagem.
3. Implementar login próprio e autorização de administrador no servidor.
4. Migrar o conteúdo e os uploads existentes, preservando os endereços das imagens.
5. Configurar variáveis privadas, testar edição/upload e publicar.

O frontend e a identidade visual podem ser preservados nessa migração. Não há senhas, tokens, banco de produção ou uploads privados neste repositório. Os arquivos de `public/` são os assets do site.

## Conteúdo

- `app/`: páginas, componentes visuais, painel e rotas de API.
- `lib/`: modelos e conteúdo inicial.
- `public/`: imagens, fontes e prévias.
- `db/` e `drizzle/`: esquema e migrações.

As demonstrações de portfólio são identificadas como tal no conteúdo do site.
