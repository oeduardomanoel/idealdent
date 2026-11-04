// robots.txt: libera buscadores e crawlers de IA (GEO) e aponta sitemap e llms.txt
export default defineEventHandler((event) => {
  const siteUrl = useRuntimeConfig(event).public.siteUrl
  const aiBots = [
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'ClaudeBot',
    'Claude-SearchBot',
    'Claude-User',
    'anthropic-ai',
    'PerplexityBot',
    'Perplexity-User',
    'Google-Extended',
    'Applebot-Extended',
    'Bingbot',
    'DuckAssistBot',
    'meta-externalagent',
    'Amazonbot',
    'CCBot'
  ]
  const lines = [
    '# Ideal Dent Odontologia · Balneário Barra do Sul (SC)',
    '',
    'User-agent: *',
    'Allow: /',
    'Disallow: /_nuxt/builds/',
    '',
    '# Assistentes e buscadores de IA podem ler e citar o site',
    ...aiBots.flatMap((bot) => [`User-agent: ${bot}`, 'Allow: /', '']),
    `Sitemap: ${siteUrl}/sitemap.xml`,
    '',
    `# Resumo para LLMs: ${siteUrl}/llms.txt`,
    `# Conteúdo completo para LLMs: ${siteUrl}/llms-full.txt`,
    ''
  ]
  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return lines.join('\n')
})
