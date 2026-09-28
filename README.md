# Crisora

Site, portfólio e painel de gestão da Crisora. Adaptado para **Next.js na Vercel + Supabase**.

## Estado

- Código preparado para Vercel; build de produção e testes locais concluídos.
- Imagens, fontes, animações, projetos e limite de seis destaques por categoria preservados.
- Publicação na Vercel e teste real do painel dependem da configuração do Supabase e das variáveis abaixo.
- Sem essas variáveis, as páginas públicas exibem o conteúdo inicial; o painel fica indisponível, sem aceitar alterações.
- O site anterior continua em https://crisora-design.creastezgin123.chatgpt.site/ até a nova publicação ser validada.

## Publicar

Siga [o guia de publicação](docs/PUBLICACAO.md).

1. Crie um projeto Supabase e execute `supabase/001_initial.sql` no SQL Editor.
2. Crie o utilizador administrador no Supabase Auth, com email confirmado. Desative o cadastro público.
3. Importe `cristianovieira24/crisora` na Vercel com o preset **Next.js**, raiz do repositório, Node.js 22 ou superior.
4. Configure as quatro variáveis de `.env.example` na Vercel e publique.
5. Abra `/admin/login` e teste login, uploads, edição e rascunhos.

Nunca publique valores reais de `.env.local` nem a chave secreta do Supabase no GitHub.

## Desenvolvimento

```sh
npm ci
# Copie .env.example para .env.local e preencha os valores do seu projeto.
npm run dev
npm test
npm run typecheck
npm run build
```

## Arquitetura

- React, Next.js App Router e TypeScript.
- Tailwind, GSAP/ScrollTrigger, Lenis, Framer Motion e WebGL.
- Supabase Postgres: projetos e configurações.
- Supabase Auth: sessão em cookies e validação no servidor; apenas o email definido em `ADMIN_EMAIL` edita.
- Supabase Storage: imagens privadas, apresentadas através de links temporários em `/media/:id`.
- Upload direto autorizado pelo servidor, até 8 MB; os bytes não passam pelas funções da Vercel.
- Tabelas com RLS e sem permissões para `anon`/`authenticated`; acesso aos dados através do servidor.

As imagens estáticas estão em `public/`. O banco e os uploads do painel não pertencem ao Git e persistem no Supabase entre deploys.

## Verificações

`npm test` verifica autorização, email confirmado, origem das alterações, validação de upload, rascunhos e seis destaques por categoria, com serviços simulados. Não substitui o teste final na conta Supabase configurada.

O código de origem da hospedagem anterior permanece no histórico, no commit `ce69e5a3819c2216fa9c52d8951efec4e07038ca`.
