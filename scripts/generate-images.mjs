// Gera og-image.png e os ícones PNG a partir de HTML, usando o Chromium do Playwright.
// Uso: node scripts/generate-images.mjs
import { createRequire } from 'node:module'
const { chromium } = createRequire(import.meta.url)('playwright')
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const font = (p) => `data:font/woff2;base64,${readFileSync(resolve(root, 'node_modules', p)).toString('base64')}`
const montserrat = font('@fontsource-variable/montserrat/files/montserrat-latin-wght-normal.woff2')
const dmsans = font('@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2')
const favicon = readFileSync(resolve(root, 'public/favicon.svg'), 'utf8')

const tooth =
  'M22.4 11.5c-6.2 0-10.4 4.4-10.4 11.1 0 4.4 1.5 7.7 3.1 11.5 1.8 4.5 2 9.3 2.9 13.3.7 3.4 2.2 5.3 4 5.3 2.4 0 3.3-3.1 4-6.8.7-3.4 1.7-6.6 6-6.6s5.3 3.2 6 6.6c.7 3.7 1.6 6.8 4 6.8 1.8 0 3.3-1.9 4-5.3.9-4 1.1-8.8 2.9-13.3 1.6-3.8 3.1-7.1 3.1-11.5 0-6.7-4.2-11.1-10.4-11.1-4 0-6.2 1.8-9.6 1.8s-5.6-1.8-9.6-1.8Z'

const waves = Array.from({ length: 9 }, (_, i) => {
  const y = 120 + i * 26
  const a = 60 + i * 6
  return `<path d="M0 ${y} C 240 ${y - a}, 480 ${y + a}, 720 ${y} S 1200 ${y - a}, 1440 ${y}" opacity="${1 - i * 0.07}"/>`
}).join('')

const og = `<!doctype html><html><head><style>
@font-face{font-family:M;src:url(${montserrat}) format('woff2');font-weight:100 900}
@font-face{font-family:D;src:url(${dmsans}) format('woff2');font-weight:100 900}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;overflow:hidden;font-family:D;color:#fff;
background:radial-gradient(700px 420px at 88% 0%,rgba(143,205,247,.75),transparent 65%),radial-gradient(800px 500px at 0% 110%,#061238,transparent 60%),linear-gradient(150deg,#2a7be8,#0d47b5 50%,#0b2f7a)}
.w{position:absolute;inset:260px -60px auto;width:1320px;height:360px;opacity:.22}
.wrap{position:relative;display:flex;height:100%;padding:72px 80px;gap:40px;align-items:center}
.l{flex:1}
.logo{display:flex;align-items:center;gap:16px;margin-bottom:44px}
.logo svg{width:64px;height:64px}
.logo b{font-family:M;font-weight:800;font-size:38px;letter-spacing:-1px;color:#bfe3fb}
.logo b span{color:#fff}
.logo small{display:block;font-family:M;font-weight:600;font-size:12px;letter-spacing:6px;color:#bfe3fb;margin-top:4px}
h1{font-family:M;font-weight:800;font-size:58px;line-height:1.04;letter-spacing:-2px}
.t{white-space:nowrap;display:inline-block;margin-top:8px;background:#fff;color:#0a1e4d;padding:0 10px;border-radius:8px}
p{margin-top:26px;font-size:26px;color:#dcf0fd}
.r{display:flex;flex-direction:column;align-items:center;gap:18px}
.tooth{width:300px;filter:drop-shadow(0 30px 40px rgba(6,18,56,.5))}
.badge{background:#fff;color:#0a1e4d;border-radius:20px;padding:14px 22px;font-family:M;font-weight:800;font-size:26px;display:flex;align-items:center;gap:10px;box-shadow:0 20px 40px -10px rgba(6,18,56,.5)}
.badge i{color:#f5b301;font-style:normal;letter-spacing:2px}
.badge small{font-family:D;font-weight:500;font-size:16px;color:#3a4a6b}
</style></head><body>
<svg class="w" viewBox="0 0 1440 400" preserveAspectRatio="none"><g fill="none" stroke="#fff" stroke-width="1.4">${waves}</g></svg>
<div class="wrap"><div class="l">
<div class="logo">${favicon.replace('<svg ', '<svg ')}<div><b><span>Ideal</span>Dent</b><small>ODONTOLOGIA</small></div></div>
<h1>Dentista em Balneário<br><span class="t">Barra do Sul</span></h1>
<p>Aparelho, facetas, canal, implante e limpeza.<br>Agende pelo WhatsApp (47) 99129-1617</p>
</div><div class="r">
<svg class="tooth" viewBox="0 0 64 64"><path d="${tooth}" fill="#fff"/><path d="M15.5 27.5c4.2-3.6 8.6-3.6 12.6-1.3 4.4 2.5 8.6 2.6 13 .2 2.6-1.4 4.8-1.6 7.4-.6" fill="none" stroke="#1560d6" stroke-width="2.6" stroke-linecap="round"/><path d="M17 32.4c3.6-2.4 7.4-2.3 11-.4 3.8 2 7.6 2 11.4.1 2.4-1.2 4.6-1.4 7-.6" fill="none" stroke="#0a1e4d" stroke-width="1.2" stroke-linecap="round"/></svg>
<div class="badge">4,9 <i>★★★★★</i><small>no Google</small></div>
</div></div></body></html>`

const icon = (size, pad = 0) => `<!doctype html><html><head><style>*{margin:0}body{width:${size}px;height:${size}px;display:grid;place-items:center;background:${pad ? '#0d47b5' : 'transparent'}}svg{width:${size - pad * 2}px;height:${size - pad * 2}px}</style></head><body>${favicon}</body></html>`

const browser = await chromium.launch()
const shot = async (html, w, h, out, transparent = false) => {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 })
  await page.setContent(html, { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: resolve(root, 'public', out), omitBackground: transparent })
  await page.close()
  console.log('✓', out)
}
await shot(og, 1200, 630, 'og-image.png')
await shot(icon(180, 0), 180, 180, 'apple-touch-icon.png', true)
await shot(icon(32, 0), 32, 32, 'favicon-32.png', true)
await shot(icon(512, 0), 512, 512, 'icon-512.png', true)
await browser.close()
