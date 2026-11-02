// Fails the build when the bundle grows past its budget. Run after `vite build`.
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { gzipSync } from 'node:zlib'

const budget = {
  chunkKb: 450, // largest single JS chunk, minified
  // All JS, gzipped, including lazily loaded pages and lesson illustrations. Raised from 350 on
  // 2026-10-31 for the field guide page (about 12 kB gzip, loaded only when opened). Raised to 375
  // on 2026-11-02 for the starter kit page, its resources and the dashboard sections (about 1 kB).
  // Raised to 380 on 2026-11-02 for the study plan roadmap and week checklists (about 2 kB).
  // Raised to 400 on 2026-11-02 for the redrawn lesson illustrations and four new ones (about
  // 16 kB gzip, all in the lazily loaded illustration chunk).
  jsGzipKb: 400,
  cssGzipKb: 20, // all CSS, gzipped
}

const dir = 'dist/assets'
const files = readdirSync(dir).map((name) => {
  const buf = readFileSync(join(dir, name))
  return { name, kb: buf.length / 1024, gzipKb: gzipSync(buf).length / 1024 }
})
const js = files.filter((f) => f.name.endsWith('.js'))
const css = files.filter((f) => f.name.endsWith('.css'))
const sum = (list) => list.reduce((n, f) => n + f.gzipKb, 0)
const largest = js.reduce((a, b) => (b.kb > a.kb ? b : a))

const rows = [
  [`largest chunk (${largest.name})`, largest.kb, budget.chunkKb],
  ['all JS, gzip', sum(js), budget.jsGzipKb],
  ['all CSS, gzip', sum(css), budget.cssGzipKb],
]
let failed = false
for (const [label, value, limit] of rows) {
  const ok = value <= limit
  failed ||= !ok
  console.log(`${ok ? 'ok  ' : 'OVER'} ${label}: ${value.toFixed(1)} kB of ${limit} kB`)
}
if (failed) {
  console.error('Bundle budget exceeded. Split the chunk or raise the budget on purpose.')
  process.exit(1)
}
