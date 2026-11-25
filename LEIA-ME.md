# Nibo Play · site pronto para a Vercel

Site estático, sem etapa de build: é só publicar esta pasta.

## Como publicar

A Vercel não aceita upload de .zip pelo painel. Use um destes caminhos:

**Pelo GitHub (recomendado)**
1. Crie um repositório e suba o conteúdo desta pasta (com o `vercel.json` na raiz).
2. Na Vercel: Add New › Project › importe o repositório.
3. Framework Preset: **Other**. Build Command e Output Directory: deixe em branco.
4. Deploy.

**Pela linha de comando**
Dentro desta pasta: `npx vercel --prod`

## Endereços

| Página | Endereço |
|---|---|
| Landing page | `/` |
| Plataforma | `/plataforma` |
| Conecte o Nibo (MCP) | `/aulas/conecte-o-nibo` |
| Aula 1 · Fiscal | `/aulas/fiscal` |
| Aula 2 · Contábil | `/aulas/contabil` |
| Aula 3 · DP | `/aulas/dp` |
| Aula 4 · Societário | `/aulas/societario` |
| Vídeo curto direto | `/plataforma#claude-1` … `#claude-8`, `#chatgpt-1` … `#chatgpt-8`, `#geral-1`, `#geral-2` |

## O que já está ligado

- **Inscrição:** formulário do HubSpot "Marketing | Conteúdos - Contador Curso de IA para contadores"
  (form `aa01c83e-e333-4c60-8f3a-688b3631685d`). Na landing page, depois do envio, leva para `/plataforma`
  no mesmo domínio. No convite da plataforma (quem chega por link compartilhado), confirma sem sair da página.
  Configuração em `js/inscricao.js`.
- **Vídeos:** 5 aulas e 18 vídeos curtos do YouTube (youtube-nocookie), com capítulos clicáveis nas aulas.
- **Materiais:** PDFs hospedados no HubSpot (Arquivos › Curso de IA para contadores - materiais).
- **Progresso e "assistido":** salvos no navegador de cada pessoa (chave `niboPlay.assistidos`).
- **Oferta "Quero aproveitar":** nibo.com.br/mcp-contador com UTMs da campanha `curso-ia-para-contadores`.
- **vercel.json:** endereços sem `.html`, `Referrer-Policy` compatível com o YouTube e cache das imagens.

## Depois de publicar, confira

1. Envie o formulário uma vez e veja se o contato chega no HubSpot e se você cai em `/plataforma`.
2. **Prévia em WhatsApp e redes:** as imagens de compartilhamento (`og:image`) estão com endereço relativo
   (`/assets/...`). WhatsApp e LinkedIn só mostram a imagem com o endereço completo. Quando o domínio
   estiver definido, troque `content="/assets/` por `content="https://SEU-DOMINIO/assets/` nos 7 arquivos .html.

## Estrutura

- `index.html`, `plataforma.html`, `aulas/*.html` – páginas (já vêm com o HTML pronto, bom para SEO)
- `js/preact.min.js`, `js/dc-runtime.js` – desenham as partes interativas
- `js/inscricao.js` – formulário do HubSpot
- `site.css` – estilos do formulário
- `assets/` – imagens
