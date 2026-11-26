# Nibo Play · IA para Contadores · site pronto para a Vercel

Site estático, sem etapa de build. Endereço final: **https://www.play.nibo.com.br/ia-para-contadores**

## Como publicar

A Vercel não aceita upload de .zip pelo painel. Use um destes caminhos:

**Pelo GitHub (recomendado)**
1. Crie um repositório e suba o conteúdo desta pasta (o `vercel.json` e a pasta `ia-para-contadores/` na raiz).
2. Na Vercel: Add New › Project › importe o repositório.
3. Framework Preset: **Other**. Build Command e Output Directory: deixe em branco.
4. Deploy.

**Pela linha de comando**
Dentro desta pasta: `npx vercel --prod`

## Domínio

1. No projeto da Vercel: Settings › Domains › adicione `www.play.nibo.com.br`.
2. No DNS do nibo.com.br, crie o registro que a Vercel indicar (normalmente um CNAME `www.play` → `cname.vercel-dns.com`).
3. Quem acessar só `www.play.nibo.com.br` é levado para `/ia-para-contadores` (regra no `vercel.json`).
   Se esse domínio já tiver outro site, retire essa regra e publique esta pasta dentro do projeto existente.

## Endereços

| Página | Endereço |
|---|---|
| Landing page | `/ia-para-contadores` |
| Plataforma | `/ia-para-contadores/plataforma` |
| Conecte o Nibo (MCP) | `/ia-para-contadores/aulas/conecte-o-nibo` |
| Aula 1 · Fiscal | `/ia-para-contadores/aulas/fiscal` |
| Aula 2 · Contábil | `/ia-para-contadores/aulas/contabil` |
| Aula 3 · DP | `/ia-para-contadores/aulas/dp` |
| Aula 4 · Societário | `/ia-para-contadores/aulas/societario` |
| Aula 5 · Financeiro | `/ia-para-contadores/aulas/financeiro` |
| Vídeo do Pacto | `/ia-para-contadores/plataforma#pacto` |
| Vídeo curto direto | `/ia-para-contadores/plataforma#claude-1` … `#claude-8`, `#chatgpt-1` … `#chatgpt-8`, `#geral-1`, `#geral-2` |

## O que já está ligado

- **Inscrição:** formulário do HubSpot "Marketing | Conteúdos - Contador Curso de IA para contadores"
  (form `aa01c83e-e333-4c60-8f3a-688b3631685d`). Na landing page, depois do envio, leva para a plataforma.
  "Entrar na plataforma" e os cards de aula só levam direto a quem já se inscreveu neste navegador; os demais passam pelo formulário.
  No convite da plataforma (quem chega por link compartilhado), confirma sem sair da página. Configuração em `ia-para-contadores/js/inscricao.js`.
- **Vídeos:** 6 aulas (Conecte o Nibo + 5 por setor), o Pacto e 18 vídeos curtos do YouTube (youtube-nocookie), com capítulos clicáveis nas aulas.
- **Materiais:** PDFs hospedados no HubSpot (Arquivos › Curso de IA para contadores - materiais).
- **Progresso e "assistido":** salvos no navegador de cada pessoa (chave `niboPlay.assistidos`).
- **Links com UTM:** "Quero aproveitar" (nibo.com.br/mcp-contador) e o banner "Conheça o ecossistema" nas aulas
  (nibo.com.br/contador), na campanha `curso-ia-para-contadores`.
- **Compartilhamento:** imagem `og-nibo-play.jpg` (1200×630) na landing page e na plataforma; cada aula usa a própria capa.
  Endereços completos, prontos para WhatsApp e LinkedIn.
- **vercel.json:** endereços sem `.html`, `Referrer-Policy` compatível com o YouTube e cache das imagens.

## Depois de publicar, confira

1. Envie o formulário uma vez: o contato chega no HubSpot e você cai na plataforma.
2. Cole o link da landing page no WhatsApp para ver a prévia com a imagem.
