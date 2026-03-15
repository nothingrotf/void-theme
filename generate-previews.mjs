import { writeFileSync } from 'node:fs'

const CH = 7.8 // char width for 13px monospace
const LH = 20  // line height
const GUTTER = 52
const PAD_X = 62 // code start x
const TITLE_H = 36
const W = 800
const H = 500

// Token types: kw=keyword, s=string, f=function, t=type, n=number, b=boolean,
// p=property, cm=comment, pm=parameter, o=operator, x=text, tl=template
const lines = [
  // line 1
  [['kw','import'],['x',' { '],['f','createServer'],['x',' } '],['kw','from'],['x',' '],['s','"node:http"']],
  // line 2 (empty)
  [],
  // line 3
  [['kw','interface'],['x',' '],['t','Config'],['x',' {']],
  // line 4
  [['x','  '],['p','port'],['x',': '],['t','number']],
  // line 5
  [['x','  '],['p','host'],['x',': '],['t','string']],
  // line 6
  [['x','  '],['p','debug'],['x','?: '],['t','boolean']],
  // line 7
  [['x','}']],
  // line 8 (empty)
  [],
  // line 9
  [['cm','// Start the development server']],
  // line 10
  [['kw','const'],['x',' config'],['x',': '],['t','Config'],['x',' '],['o','='],['x',' {']],
  // line 11
  [['x','  '],['p','port'],['x',': '],['n','3000'],['x',',']],
  // line 12
  [['x','  '],['p','host'],['x',': '],['s','"localhost"'],['x',',']],
  // line 13
  [['x','  '],['p','debug'],['x',': '],['b','true'],['x',',']],
  // line 14
  [['x','}']],
  // line 15 (empty)
  [],
  // line 16
  [['kw','async'],['x',' '],['kw','function'],['x',' '],['f','startServer'],['x','('],['pm','cfg'],['x',': '],['t','Config'],['x',') {']],
  // line 17
  [['x','  '],['kw','const'],['x',' server '],['o','='],['x',' '],['f','createServer'],['x','(('],['pm','req'],['x',', '],['pm','res'],['x',') '],['o','=>'],['x',' {']],
  // line 18
  [['x','    '],['pm','res'],['x','.'],['f','writeHead'],['x','('],['n','200'],['x',', { '],['s','"Content-Type"'],['x',': '],['s','"text/plain"'],['x',' })']],
  // line 19
  [['x','    '],['pm','res'],['x','.'],['f','end'],['x','('],['tl','`Running on ${'],['pm','cfg'],['x','.'],['p','host'],['tl','}:${'],['pm','cfg'],['x','.'],['p','port'],['tl','}`'],['x',')']],
  // line 20
  [['x','  })']],
  // line 21 (empty)
  [],
  // line 22
  [['x','  server.'],['f','listen'],['x','('],['pm','cfg'],['x','.'],['p','port'],['x',', '],['pm','cfg'],['x','.'],['p','host'],['x',')']],
  // line 23
  [['x','  console.'],['f','log'],['x','('],['tl','`Server ready at http://${'],['pm','cfg'],['x','.'],['p','host'],['tl','}:${'],['pm','cfg'],['x','.'],['p','port'],['tl','}`'],['x',')']],
  // line 24
  [['x','}']],
  // line 25 (empty)
  [],
  // line 26
  [['f','startServer'],['x','(config)']],
]

const variants = [
  {
    name: 'void',
    bg: '#000000',
    titleBg: '#000000',
    sep: '#1a1a1a',
    lnColor: '#6e6d62',
    lnActive: '#ededed',
    activeLine: '#ffffff08',
    dots: ['#ff5f57','#febc2e','#28c840'],
    titleText: '#6e6d62',
    colors: {
      kw: '#f75f8f', s: '#62c073', f: '#c472fb', t: '#c472fb',
      n: '#52a8ff', b: '#52a8ff', p: '#52a8ff', cm: '#758575',
      pm: '#ff9907', o: '#f75f8f', x: '#ededed', tl: '#1da9b0',
    }
  },
  {
    name: 'void-soft',
    bg: '#000000',
    titleBg: '#000000',
    sep: '#1a1a1a',
    lnColor: '#6e6d62',
    lnActive: '#e5e2da',
    activeLine: '#ffffff08',
    dots: ['#ff5f57','#febc2e','#28c840'],
    titleText: '#6e6d62',
    colors: {
      kw: '#d9939f', s: '#8ac49a', f: '#b196d0', t: '#b196d0',
      n: '#89b4d4', b: '#89b4d4', p: '#89b4d4', cm: '#758575',
      pm: '#daa278', o: '#d9939f', x: '#ccc9c2', tl: '#5eaab5',
    }
  },
  {
    name: 'void-github',
    bg: '#010409',
    titleBg: '#010409',
    sep: '#161b22',
    lnColor: '#484f58',
    lnActive: '#e6edf3',
    activeLine: '#ffffff06',
    dots: ['#ff5f57','#febc2e','#28c840'],
    titleText: '#484f58',
    colors: {
      kw: '#ff7b72', s: '#7ee787', f: '#d2a8ff', t: '#d2a8ff',
      n: '#79c0ff', b: '#79c0ff', p: '#79c0ff', cm: '#8b949e',
      pm: '#ffa657', o: '#ff7b72', x: '#e6edf3', tl: '#a5d6ff',
    }
  },
  {
    name: 'void-light',
    bg: '#ffffff',
    titleBg: '#ffffff',
    sep: '#e5e5e5',
    lnColor: '#b0b0b0',
    lnActive: '#393a34',
    activeLine: '#f6f6f6',
    dots: ['#ec6a5e','#f4bf4f','#61c554'],
    titleText: '#999999',
    colors: {
      kw: '#ab5959', s: '#1a7f37', f: '#8b5cf6', t: '#8b5cf6',
      n: '#2e86de', b: '#2e86de', p: '#2e86de', cm: '#a0ada0',
      pm: '#b56c1a', o: '#ab5959', x: '#393a34', tl: '#1e8a7a',
    }
  },
]

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function generateSVG(v) {
  const totalLines = lines.length
  const height = TITLE_H + totalLines * LH + 20
  const activeLineIdx = 9 // line 10 (0-indexed)

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${height}" viewBox="0 0 ${W} ${height}">
  <defs>
    <clipPath id="frame"><rect width="${W}" height="${height}" rx="10"/></clipPath>
  </defs>
  <g clip-path="url(#frame)">
    <!-- Background -->
    <rect width="${W}" height="${height}" fill="${v.bg}"/>

    <!-- Title bar -->
    <rect width="${W}" height="${TITLE_H}" fill="${v.titleBg}"/>
    <circle cx="20" cy="18" r="6" fill="${v.dots[0]}"/>
    <circle cx="40" cy="18" r="6" fill="${v.dots[1]}"/>
    <circle cx="60" cy="18" r="6" fill="${v.dots[2]}"/>
    <text x="400" y="23" font-family="'SF Pro', 'Segoe UI', system-ui, sans-serif" font-size="13" fill="${v.titleText}" text-anchor="middle">server.ts</text>
    <line x1="0" y1="${TITLE_H}" x2="${W}" y2="${TITLE_H}" stroke="${v.sep}" stroke-width="1"/>

    <!-- Gutter separator -->
    <line x1="${GUTTER}" y1="${TITLE_H}" x2="${GUTTER}" y2="${height}" stroke="${v.sep}" stroke-width="1"/>

    <!-- Active line highlight -->
    <rect x="0" y="${TITLE_H + activeLineIdx * LH}" width="${W}" height="${LH}" fill="${v.activeLine}"/>
`

  // Line numbers
  for (let i = 0; i < totalLines; i++) {
    const y = TITLE_H + i * LH + 15
    const num = i + 1
    const isActive = i === activeLineIdx
    const color = isActive ? v.lnActive : v.lnColor
    const weight = isActive ? ' font-weight="bold"' : ''
    svg += `    <text x="${GUTTER - 8}" y="${y}" font-family="'JetBrains Mono', 'Cascadia Code', 'Fira Code', monospace" font-size="13" fill="${color}" text-anchor="end"${weight}>${num}</text>\n`
  }

  // Code lines
  for (let i = 0; i < totalLines; i++) {
    const tokens = lines[i]
    if (tokens.length === 0) continue

    const y = TITLE_H + i * LH + 15
    let col = 0

    for (const [type, text] of tokens) {
      const x = PAD_X + col * CH
      const color = v.colors[type] || v.colors.x
      const italic = type === 'cm' ? ' font-style="italic"' : ''
      svg += `    <text x="${x.toFixed(1)}" y="${y}" font-family="'JetBrains Mono', 'Cascadia Code', 'Fira Code', monospace" font-size="13" fill="${color}"${italic}>${esc(text)}</text>\n`
      col += text.length
    }
  }

  svg += `  </g>\n</svg>\n`
  return svg
}

for (const v of variants) {
  const svg = generateSVG(v)
  const path = `assets/preview-${v.name}.svg`
  writeFileSync(path, svg)
  console.log(`Generated ${path}`)
}
