// Generates fictional A/B experiment practice data for session s15 (Launch and learn).
// Writes public/datasets/<slug>/s15-experiment-results.csv for each case study and prints
// a per-case summary (rates, lift, z-test, data-quality issue) for the answer keys.
// Seeded, so output is reproducible. Run from the repo root: node scripts/generate-s15-datasets.mjs
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const DAYS = 14
const START = Date.UTC(2026, 2, 2)

function mulberry32(seed) {
  let a = seed
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function binomial(rng, n, p) {
  let k = 0
  for (let i = 0; i < n; i++) if (rng() < p) k++
  return k
}

function dateOf(day) {
  return new Date(START + day * 86400000).toISOString().slice(0, 10)
}

// Rates are per exposed user. guard is events per exposed user (shown per 1000 in summaries).
// Treatment values are the rates for the treatment arm, per segment.
const cases = [
  {
    slug: 'moneypilot',
    seed: 15001,
    perArmPerDay: 1500,
    trap: 'dup',
    trapDay: 6,
    segments: [
      { name: 'low_balance', share: 0.25, c: [0.27, 0.7, 0.018], t: [0.4, 0.72, 0.03] },
      { name: 'mid_balance', share: 0.45, c: [0.32, 0.88, 0.01], t: [0.43, 0.9, 0.0105] },
      { name: 'high_balance', share: 0.3, c: [0.36, 0.96, 0.006], t: [0.46, 0.965, 0.006] },
    ],
  },
  {
    slug: 'steady',
    seed: 15002,
    perArmPerDay: 750,
    trap: 'missing',
    trapDay: 8,
    segments: [
      { name: 'new_users', share: 0.4, c: [0.3, 0.42, 0.014], t: [0.42, 0.455, 0.028] },
      { name: 'returning_users', share: 0.6, c: [0.45, 0.58, 0.009], t: [0.56, 0.605, 0.009] },
    ],
  },
  {
    slug: 'triage',
    seed: 15003,
    perArmPerDay: 160,
    trap: 'srm',
    trapDays: [7, 8, 9, 10],
    srmRatio: 0.45,
    srmBoost: 0.07,
    segments: [
      { name: 'billing', share: 0.25, c: [0.3, 0.45, 0.07], t: [0.45, 0.49, 0.13] },
      { name: 'how_to', share: 0.45, c: [0.35, 0.65, 0.04], t: [0.5, 0.71, 0.04] },
      { name: 'bug_report', share: 0.3, c: [0.25, 0.5, 0.055], t: [0.38, 0.54, 0.055] },
    ],
  },
]

function generate(cfg) {
  const rng = mulberry32(cfg.seed)
  const rows = []
  for (let d = 0; d < DAYS; d++) {
    const block = []
    for (const arm of ['control', 'treatment']) {
      for (const seg of cfg.segments) {
        const noise = 0.95 + rng() * 0.1
        let n = Math.round(cfg.perArmPerDay * seg.share * noise)
        const inSrm = cfg.trap === 'srm' && cfg.trapDays.includes(d)
        if (arm === 'treatment' && inSrm) n = Math.round(n * cfg.srmRatio)
        if (arm === 'treatment' && cfg.trap === 'missing' && d === cfg.trapDay) continue
        const [lead, succ, guard] = arm === 'control' ? seg.c : seg.t
        const exposed = binomial(rng, n, 0.95)
        const boost = arm === 'treatment' && inSrm ? cfg.srmBoost : 0
        block.push({
          date: dateOf(d),
          arm,
          segment: seg.name,
          assigned: n,
          exposed,
          leading: binomial(rng, exposed, lead),
          successes: binomial(rng, exposed, Math.min(succ + boost, 0.99)),
          guardrail: binomial(rng, exposed, guard),
        })
      }
    }
    rows.push(...block)
    if (cfg.trap === 'dup' && d === cfg.trapDay) rows.push(...block.map((r) => ({ ...r })))
  }
  return rows
}

function toCsv(rows) {
  const head = 'date,arm,segment,assigned,exposed,leading_events,successes,guardrail_events'
  const lines = rows.map((r) =>
    [r.date, r.arm, r.segment, r.assigned, r.exposed, r.leading, r.successes, r.guardrail].join(
      ',',
    ),
  )
  return head + '\n' + lines.join('\n') + '\n'
}

function erfc(x) {
  const z = Math.abs(x)
  const t = 1 / (1 + 0.5 * z)
  const r =
    t *
    Math.exp(
      -z * z -
        1.26551223 +
        t *
          (1.00002368 +
            t *
              (0.37409196 +
                t *
                  (0.09678418 +
                    t *
                      (-0.18628806 +
                        t *
                          (0.27886807 +
                            t *
                              (-1.13520398 +
                                t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))),
    )
  return x >= 0 ? r : 2 - r
}

function zTest(x1, n1, x2, n2) {
  const p1 = x1 / n1
  const p2 = x2 / n2
  const pool = (x1 + x2) / (n1 + n2)
  const se = Math.sqrt(pool * (1 - pool) * (1 / n1 + 1 / n2))
  const z = (p2 - p1) / se
  return { z, p: erfc(Math.abs(z) / Math.SQRT2) }
}

const fmtP = (p) => (p < 0.0001 ? 'p<0.0001' : 'p=' + p.toFixed(4))
const pct = (x) => (x * 100).toFixed(2) + '%'
const per1000 = (x) => (x * 1000).toFixed(1)

function sum(rows, arm, key, segment) {
  return rows
    .filter((r) => r.arm === arm && (!segment || r.segment === segment))
    .reduce((a, r) => a + r[key], 0)
}

function metricLine(rows, label, segment) {
  const out = { label }
  for (const arm of ['control', 'treatment']) {
    out[arm] = {
      assigned: sum(rows, arm, 'assigned', segment),
      exposed: sum(rows, arm, 'exposed', segment),
      leading: sum(rows, arm, 'leading', segment),
      successes: sum(rows, arm, 'successes', segment),
      guardrail: sum(rows, arm, 'guardrail', segment),
    }
  }
  const c = out.control
  const t = out.treatment
  const lines = [
    `${label}: exposed control ${c.exposed}, treatment ${t.exposed} (assigned ${c.assigned} / ${t.assigned})`,
  ]
  const specs = [
    ['leading', 'leading', pct],
    ['success', 'successes', pct],
    ['guardrail', 'guardrail', per1000],
  ]
  for (const [name, key, f] of specs) {
    const r1 = c[key] / c.exposed
    const r2 = t[key] / t.exposed
    const zt = zTest(c[key], c.exposed, t[key], t.exposed)
    const unit = name === 'guardrail' ? ' per 1000' : ''
    const abs =
      name === 'guardrail' ? per1000(r2 - r1) + ' per 1000' : ((r2 - r1) * 100).toFixed(2) + ' pp'
    lines.push(
      `  ${name}: control ${f(r1)}${unit}, treatment ${f(r2)}${unit}, abs ${abs}, rel ${(((r2 - r1) / r1) * 100).toFixed(1)}%, z=${zt.z.toFixed(2)}, ${fmtP(zt.p)}`,
    )
  }
  return lines.join('\n')
}

function srm(rows, label) {
  const a = sum(rows, 'control', 'assigned')
  const b = sum(rows, 'treatment', 'assigned')
  const e = (a + b) / 2
  const chi = (a - e) ** 2 / e + (b - e) ** 2 / e
  const p = erfc(Math.sqrt(chi / 2))
  return `SRM check (${label}): assigned control ${a}, treatment ${b}, ratio ${(b / a).toFixed(3)}, chi2=${chi.toFixed(1)}, ${fmtP(p)}`
}

function dailyAssigned(rows) {
  const lines = []
  for (let d = 0; d < DAYS; d++) {
    const day = rows.filter((r) => r.date === dateOf(d))
    const c = day.filter((r) => r.arm === 'control').reduce((s, r) => s + r.assigned, 0)
    const t = day.filter((r) => r.arm === 'treatment').reduce((s, r) => s + r.assigned, 0)
    lines.push(`  ${dateOf(d)}: control ${c}, treatment ${t}`)
  }
  return lines.join('\n')
}

function summarize(cfg, rows) {
  const out = [`=== ${cfg.slug} (${rows.length} rows) ===`]
  const keys = new Set()
  let dups = 0
  for (const r of rows) {
    const k = [r.date, r.arm, r.segment].join('|')
    if (keys.has(k)) dups++
    keys.add(k)
  }
  out.push(`duplicate rows: ${dups}`)
  out.push(
    `rows per date: ${[...new Set(rows.map((r) => r.date))].map((d) => rows.filter((r) => r.date === d).length).join(',')}`,
  )
  out.push(srm(rows, 'all days, as delivered'))

  let clean = rows
  let issue = ''
  if (cfg.trap === 'dup') {
    const seen = new Set()
    clean = rows.filter((r) => {
      const k = [r.date, r.arm, r.segment].join('|')
      if (seen.has(k)) return false
      seen.add(k)
      return true
    })
    issue = `${dateOf(cfg.trapDay)} appears twice (${dups} duplicate rows, all arms and segments). Fix: drop the duplicate rows.`
  } else if (cfg.trap === 'missing') {
    const gone = dateOf(cfg.trapDay)
    clean = rows.filter((r) => r.date !== gone)
    issue = `${gone} has no treatment rows. Fix: drop that date for both arms so the days match.`
    out.push(`daily assigned:\n${dailyAssigned(rows)}`)
  } else {
    const bad = cfg.trapDays.map(dateOf)
    clean = rows.filter((r) => !bad.includes(r.date))
    issue = `treatment assignment drops to about ${cfg.srmRatio * 100}% of control on ${bad[0]} to ${bad[bad.length - 1]}. Fix: exclude those days for both arms and report the sample ratio mismatch.`
    out.push(`daily assigned:\n${dailyAssigned(rows)}`)
    out.push(srm(clean, 'excluding those days'))
  }
  out.push(`data-quality issue: ${issue}`)
  for (const [view, data] of [
    ['AS DELIVERED (naive)', rows],
    ['AFTER FIX', clean],
  ]) {
    out.push(`--- ${view} ---`)
    out.push(metricLine(data, 'overall'))
    for (const s of cfg.segments) out.push(metricLine(data, s.name, s.name))
  }
  return out.join('\n')
}

for (const cfg of cases) {
  const rows = generate(cfg)
  const dir = join(root, 'public', 'datasets', cfg.slug)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 's15-experiment-results.csv'), toCsv(rows))
  console.log(summarize(cfg, rows) + '\n')
}
