# Ideal Dent Odontologia · site

Site da Ideal Dent Odontologia (Dra. Marcela Guimarães), em Balneário Barra do Sul (SC). Feito em Nuxt 4, gerado estático e pronto para a Vercel.

## Rodar local

```bash
npm install
npm run dev
```

## Publicar na Vercel

1. Importe o repositório na Vercel. O framework (Nuxt) é detectado sozinho.
2. Em **Settings → Environment Variables**, crie `NUXT_PUBLIC_SITE_URL` com o domínio final (ex.: `https://www.idealdent.com.br`). Ele entra no canonical, sitemap, robots, llms.txt e Open Graph. Sem essa variável, o build usa o domínio `.vercel.app` do projeto.
3. Opcional: `NUXT_PUBLIC_GTAG_ID` com o ID do GA4 ou Google Ads. Os cliques no WhatsApp disparam o evento `generate_lead` (e `Contact` no Pixel da Meta, se instalado).

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Endereço, telefones, horário, nota do Google, equipe, avaliações, FAQ | `shared/clinic.ts` |
| Tratamentos (texto das 8 páginas, FAQ de cada um) | `shared/services.ts` |
| Cores, fontes, botões, animações | `app/assets/css/main.css` |
| Seções da home | `app/components/*Section.vue` |

Tudo (site, schema.org, sitemap e llms.txt) lê desses dois arquivos de dados. Mudou lá, muda em todo lugar.

## Fotos

As fotos da equipe entram em `public/images/`. Depois é só preencher o campo `photo` do membro em `shared/clinic.ts` (ex.: `photo: '/images/dra-marcela.webp'`). Sem foto, aparece o avatar com as iniciais.

Para regerar a imagem de compartilhamento e os ícones: `node scripts/generate-images.mjs` (usa Playwright).

## SEO e GEO

- `/sitemap.xml`, `/robots.txt`, `/llms.txt` e `/llms-full.txt` são gerados no build a partir dos dados.
- `robots.txt` libera buscadores e crawlers de IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended etc.).
- Schema.org: `Dentist` + `MedicalClinic` com endereço, geo, horário e serviços; `Person` para cada dentista; `FAQPage`; `MedicalWebPage` e `BreadcrumbList` nas páginas de tratamento.
- Uma página por tratamento com título local ("... em Balneário Barra do Sul").

## Antes de publicar

- [ ] Informar o CRO do Dr. Jhuan Prado em `shared/clinic.ts` (o CFO exige nome e CRO em publicidade).
- [ ] Confirmar que a Dra. Marcela é a responsável técnica (aparece no rodapé).
- [ ] Adicionar fotos reais da equipe e da clínica.
- [ ] Cadastrar o domínio no Google Search Console e enviar o sitemap.
- [ ] Colocar o link do site no Perfil da Empresa no Google (hoje está sem site).
