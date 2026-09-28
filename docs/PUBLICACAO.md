# Publicação da Crisora

## 1. Supabase

Crie um projeto dedicado à Crisora. Guarde a senha do banco no seu gestor de senhas; o site não precisa dessa senha.

No SQL Editor execute `supabase/001_initial.sql`. Isso cria `projects`, `site_settings` e o bucket privado `crisora-media`, com limite de 8 MB e tipos JPG, PNG e WebP.

Em Authentication, desative o cadastro público de utilizadores. Crie o administrador com o seu email e senha e confirme o email. O site não permite cadastro aberto. Defina `ADMIN_EMAIL` com exatamente esse email. A senha fica no Supabase Auth, nunca no código nem nas variáveis da Vercel.

Em caso de perda de senha, o proprietário do projeto pode gerir o acesso pelo painel Supabase. Não foi implementada uma página pública de recuperação de senha.

## 2. Variáveis da Vercel

Configure em Settings > Environment Variables:

| Variável | Conteúdo |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Chave publishable do projeto |
| `SUPABASE_SECRET_KEY` | Chave secret de servidor, ou a antiga service_role |
| `ADMIN_EMAIL` | Email confirmado do administrador |

A chave secreta não deve ter prefixo `NEXT_PUBLIC_`. A chave publishable foi feita para exposição no cliente, mas não concede acesso às tabelas desta aplicação.

Configure as variáveis em Production. Se utilizar previews, prefira um projeto Supabase separado para não editar dados reais durante testes. Alterar variáveis requer novo deploy.

## 3. Vercel

Importe o repositório `cristianovieira24/crisora`. Use Next.js, pasta raiz, instalação `npm ci`, build `npm run build` e saída padrão. Não use exportação estática, GitHub Pages nem `dist` como pasta de saída.

O arquivo `vercel.json` já define o framework e os comandos. Não é necessário um domínio pago para validar o primeiro deploy; utilize a URL que a própria Vercel atribuir. Custos, limites e elegibilidade do plano devem ser confirmados na sua conta antes de contratar serviços.

## 4. Conteúdo existente

Os sete projetos iniciais e a composição padrão estão no código e aparecem sem importação manual. Alterações feitas no novo painel ficam guardadas no Supabase e prevalecem sobre os valores iniciais.

Antes da troca definitiva, confira se foram feitas novas edições no painel da hospedagem antiga. Se houver, migre os registros de `projects` e o JSON de `site_settings`. Para uploads antigos, copie os arquivos do armazenamento original para `crisora-media`, preservando o identificador após `/media/`.

Não guarde dumps de dados privados ou credenciais neste repositório.

## 5. Conferência antes de divulgar

- Abra a página inicial e `/portfolio` sem estar autenticado.
- Verifique as três categorias, as imagens, o fundo e os links.
- Entre em `/admin/login` com o administrador e crie um rascunho.
- Envie uma capa JPG/PNG/WebP e confirme a prévia; só depois guarde o projeto.
- Publique, altere a categoria e confirme o limite de seis destaques por categoria.
- Troque uma imagem de fundo, recarregue o site e confira a animação.
- Saia do painel e confirme que não consegue editar sem entrar novamente.

Os testes locais usam serviços simulados. A validação de login, refresh de sessão, upload e gravação em produção só termina após configurar suas contas.

## Referências

- https://vercel.com/docs/frameworks/full-stack/nextjs
- https://supabase.com/docs/guides/auth/server-side/creating-a-client?framework=nextjs
- https://supabase.com/docs/guides/storage/uploads/standard-uploads
