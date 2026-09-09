# Handoff: Substrate — Editorial Tech Demos Site

## Overview

**Substrate** is an editorial publication of interactive computing demonstrations — a quiet, magazine-style website where curious readers can explore how computers actually work (networks, hardware, algorithms) through short essays paired with interactive demos.

This handoff covers two views, locked to a single visual direction:

1. **Landing page** — Variant B (“Press”): a cool, dark editorial layout with a typographic hero, an indexed list of demos, an editorial manifesto, and a departments grid.
2. **Demo detail page** — A long-form article with a working interactive demo embedded mid-article. The reference demo is a **TCP three-way handshake** visualization with adjustable latency, packet-drop controls, and a live event log.

Tone: serious, editorial, Quanta-Magazine-meets-Stripe-Press. Generous whitespace, restrained color, serif-forward.

---

## About the Design Files

The HTML/JSX/CSS files bundled in this folder are **design references**, not production code. They exist to communicate intended layout, typography, color, motion, and behavior in a runnable form.

**Your task is to recreate these designs in the target codebase's existing environment** — React, Next.js, SvelteKit, Astro, or whatever the project already uses — following its established patterns, component primitives, design tokens, and routing conventions. If no codebase exists yet, choose the most appropriate framework for an editorial site (Next.js or Astro recommended) and implement from there.

Do **not** ship the prototype's `app.jsx` / Babel-in-the-browser setup as-is — it's a single-file React prototype, fine for design review, wrong for production.

---

## Fidelity

**Mid-fidelity.** Layout, typography, color palette, spacing, and interaction behavior are all final and should be matched precisely. However:

- Demo card thumbnails are placeholder schematic SVGs — replace with real editorial illustrations or diagrams in production.
- Article body copy is sample editorial prose — replace with real content.
- Author names, dates, ISSN, “Vol. III · No. 14” are all placeholder.
- The TCP demo is fully working and can be ported as-is logic-wise; visuals should match.

---

## Locked Configuration

This handoff is locked to:

- **Variant: B (“Press”)** — cool dark theme, cyan accent
- **Density: regular**

The prototype shipped with two variants and three densities; production should implement only Variant B at regular density unless theme switching is later requested.

---

## Design Tokens

### Colors (Variant B)

| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#0f1216` | Page background |
| `--bg-2` | `#161a20` | Recessed surfaces (cards, demo container, manifesto background, code blocks) |
| `--ink` | `#e8e3d6` | Primary text, headings |
| `--ink-soft` | `#b3ad9e` | Body copy, secondary text |
| `--ink-mute` | `#7a7568` | Meta, kickers, captions |
| `--rule` | `#e8e3d6` | Strong rule lines (full-strength) |
| `--rule-soft` | `rgba(232,227,214,0.16)` | Default rule/border between sections, cards, list rows |
| `--accent` | `#7fd4d8` | Cyan — links on hover, drop-cap, pull-quote emphasis, interactive state, italic emphasis |
| `--accent-2` | `#b8eaec` | Lighter cyan — body emphasis (`<em>`) |

### Typography

Three families, all from Google Fonts:

- **Serif (display + body editorial)** — `Source Serif 4`, weights 400/500/600 + italics. Falls back to `Iowan Old Style`, `Apple Garamond`, `Georgia`, serif.
- **Sans (UI + meta)** — `Inter Tight`, weights 400/500/600. Falls back to `Inter`, system-ui.
- **Mono (kickers, code, log)** — `JetBrains Mono`, weights 400/500. Falls back to `ui-monospace`, `SF Mono`, `Menlo`.

### Type scale (Variant B)

| Element | Family | Size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| Hero h1 | Serif | `clamp(80px, 11vw, 168px)` | 400 | 1.0 | -0.035em |
| Hero dek (italic) | Serif italic | 20px | 400 | 1.45 | — |
| Section h2 (article rows) | Serif | 28px | 400 | 1.15 | -0.005em |
| Article row dek | Serif | 15px | 400 | 1.5 | — |
| Departments h3 | Serif | 28px | 400 | — | -0.01em |
| Detail page h1 | Serif | `clamp(40px, 5vw, 72px)` | 400 | 1.05 | -0.02em |
| Detail dek (italic) | Serif italic | `clamp(20px, 1.6vw, 24px)` | 400 | 1.45 | — |
| Detail prose paragraph | Serif | 19px | 400 | 1.6 | — |
| Detail prose h3 | Serif | 28px | 400 | — | -0.005em |
| Drop-cap | Serif italic | 80px | 400 | 0.8 | — |
| Kicker / meta | Mono | 11px | 400 | — | 0.06–0.14em, uppercase |
| Inline `<code>` | Mono | 15px | 400 | — | — |

### Spacing & layout

- Outer page padding: `--pad-x: 56px` (regular density), `--pad-y: 96px`
- Standard section gap: `--gap: 28px`
- Max content width (detail prose): `660px`
- Max width (detail page overall): `1240px`
- Max width (TCP demo container): `1080px`

### Border radii

- Cards/thumbnails: `2px` (deliberately minimal, editorial-feeling)
- Buttons (`.btn-primary`): `999px` (pill)
- Code blocks, pills: `2–3px`

### Rules

Newspaper-style hairline rules are core to Variant B's identity:

- Section borders: `1px solid var(--rule-soft)`
- Strong rules (footer top, manifesto label): `1px solid var(--rule)` at full opacity
- Vertical rules between TCP demo lanes
- Horizontal rules separating each row in the article list and Table of Contents

---

## Screens

### Screen 1: Landing Page (Variant B)

**Purpose:** Reader lands here, scans the issue's contents, picks a demonstration.

**Sections, top to bottom:**

#### 1. Masthead

- Full-width header, `20px var(--pad-x)` padding, bottom border `1px solid var(--rule-soft)`.
- Flex row, space-between.
- **Left:** brand block — `SUBSTRATE` wordmark (Source Serif 4, 20px, 500 weight, letter-spacing 0.14em), 36×1px horizontal rule, italic tagline “An archive of how computers actually work” (Source Serif italic, 13px, `--ink-mute`).
- **Right:** five nav links (Mono, 11px, uppercase, letter-spacing 0.12em, `--ink-soft` → `--accent` on hover): Index, Networks, Silicon, Methods, About. Gap 32px.

#### 2. Hero (typographic statement)

- Padding: `calc(var(--pad-y) * 1.1)` top/bottom, `var(--pad-x)` left/right.
- Bottom border `1px solid var(--rule-soft)`.
- Three-column grid: `1fr 2fr 1fr`, gap 48px.
- **Left column:** vertical kicker (Mono, 11px, uppercase, letter-spacing 0.14em, `--ink-mute`), `writing-mode: vertical-rl`, rotated 180°. Text: `Issue XIV / Spring MMXXVI`.
- **Center column:**
  - Massive serif headline broken across three lines: `Read` / `the` / `machine.`. Source Serif 4, 400 weight, `clamp(80px, 11vw, 168px)`, line-height 1.0, letter-spacing -0.035em.
  - Below: italic dek with cyan left-border. `Source Serif italic`, 20px, line-height 1.45, `--ink-soft`. Border-left `2px solid var(--accent)`, padding-left 20px. Max-width 36ch. Copy: “Six interactive essays on what happens between the keystroke and the pixel. We do not abstract; we open the box.”
- **Right column — “In this issue” table of contents:**
  - Mono uppercase header (10px, 0.14em letter-spacing, `--ink-mute`), 16px margin-bottom, padding-bottom 12px, bottom border `--rule-soft`.
  - Ordered list, no list-style. Each item is a 2-column grid (`28px 1fr`, gap 12px), 10px vertical padding, bottom border `--rule-soft`, cursor pointer.
  - Item layout: small mono number (e.g., `01`, Mono 11px, `--ink-mute`) + serif title (Source Serif, 15px, line-height 1.25, `--ink`).
  - Hover: text turns `--accent`, padding-left animates to 6px (transition 0.15s).
  - Click → navigate to `/demo/<slug>`.

#### 3. Article list (Index of demonstrations)

- Padding `var(--pad-y) var(--pad-x)`, bottom border `--rule-soft`.
- Section head: small mono kicker `— Index of demonstrations`, 40px margin-bottom.
- `<ul>` with no list-style, 0 padding/margin.
- Each row is a 5-column grid: `60px 140px 1fr 200px 120px`, gap 32px, padding 36px 0, top border `--rule-soft`. Last row gets bottom border too.
- Hover: row gains 16px horizontal padding (transition 0.15s), title color shifts to `--accent`.
- Cursor pointer; click → `/demo/<slug>`.

**Per-row columns:**
1. **Item number** — Source Serif italic 28px, `--ink-mute`. Format `01`, `02`, …
2. **Meta** — vertical stack, gap 6px:
   - Kicker (Mono 11px uppercase 0.12em, `--ink-mute`) — section name e.g. “Networking”.
   - Author byline — Source Serif italic 14px, `--ink-soft`.
3. **Title block:**
   - h3 — Source Serif 400, 28px, line-height 1.15, letter-spacing -0.005em, margin-bottom 8px, `text-wrap: pretty`.
   - p (dek) — Source Serif 15px, line-height 1.5, `--ink-soft`, max-width 50ch.
4. **Thumbnail** — `--bg-2` background, `1px solid --rule-soft`, border-radius 2px, aspect-ratio 16/10, contains a small schematic SVG (placeholder). Hidden below 1100px.
5. **Read meta** — right-aligned column, gap 8px:
   - “Interactive” pill if applicable — Mono 10px uppercase 0.12em letter-spacing, 1px cyan border, cyan text, 3px×8px padding, 2px border-radius.
   - Read time — Mono 11px, `--ink-mute`, letter-spacing 0.04em.

**Six row contents:**

| # | Section | Title | Author | Read | Interactive |
|---|---|---|---|---|---|
| 01 | Networking | A conversation in three packets | M. Halberstam | 12 min | ✅ |
| 02 | The Browser | How a webpage becomes a tree | R. Okafor | 18 min | — |
| 03 | Hardware | Five stages, one instruction | I. Chen | 22 min | — |
| 04 | Algorithms | The patient art of halving | S. Patel | 9 min | — |
| 05 | Hardware | Why your loop is slow | I. Chen | 15 min | — |
| 06 | Networking | A GET request, in full | M. Halberstam | 20 min | — |

Full deks are in `app.jsx` `DEMOS` constant.

#### 4. Manifesto (Editorial)

- Padding `var(--pad-y) var(--pad-x)`, bottom border `--rule-soft`.
- 2-column grid: `200px 1fr`, gap 60px, max-width 1100px.
- **Left:** uppercase mono label `EDITORIAL` (11px, 0.14em, `--ink-mute`), with a top border `1px solid --rule-soft`, padding-top 12px.
- **Right:** Two paragraphs of editorial copy. Source Serif 400, `clamp(20px, 2vw, 26px)`, line-height 1.45, `--ink-soft`. `<em>` styled italic + `--accent`. First paragraph has a CSS first-letter drop-cap: Source Serif italic 64px, line-height 0.8, float-left, padding 6px 12px 0 0, `--accent`. Closes with a `--m-sig`: italic 16px, `--ink-mute`, `— The Editors`.

Copy:
> Most of what a computer does happens behind a curtain of metaphor: *files*, *windows*, *the cloud*. These are useful fictions. They are also, sometimes, in the way.
>
> Substrate publishes interactive demonstrations because the alternative — a paragraph attempting to describe an event that takes place in microseconds — is not really an alternative at all. We hope you stay a while.

#### 5. Departments grid

- Padding `var(--pad-y) var(--pad-x)`.
- Section head: kicker `— Departments`, 40px margin-bottom.
- 4-column grid (collapses to 2-col below 1100px), top border `--rule-soft`.
- Each cell: padding 32px 24px 32px 0, right border `--rule-soft` (last cell has none), cursor pointer.
- Hover: `--bg-2` background, padding-left 16px, padding-right 8px (transition 0.2s).
- Cell contents:
  - Italic count number — Source Serif italic 14px, `--accent`, format `08`, margin-bottom 8px.
  - h3 — Source Serif 400, 28px, letter-spacing -0.01em, margin-bottom 12px.
  - p — Source Serif 15px, line-height 1.45, `--ink-soft`, max-width 28ch.

Four departments:
- **Networks** (08) — “Packets, protocols, the spaces between machines.”
- **Silicon** (05) — “What the CPU is actually doing while you wait.”
- **Methods** (11) — “Classical algorithms, walked through one step at a time.”
- **The Browser** (06) — “A surprisingly elaborate document viewer.”

#### 6. Footer

- Padding 60px var(--pad-x) 32px.
- Top border (full strength) `1px solid var(--rule)`, padding-top 32px.
- 5-column grid: `2fr 1fr 1fr 1fr 1fr`, gap 32px.
- Each column has a Mono 10px uppercase header (0.14em letter-spacing, `--ink-mute`).
- Body text/links — Source Serif 13px, line-height 1.5, `--ink-soft` (paragraphs) or `--ink` (links). Links → `--accent` on hover.
- Columns: Substrate (description), Index (Networks/Silicon/Methods), Editorial (Mission/Contributors/Style), Stay (Newsletter/RSS), ISSN (`2998–0044`, `© MMXXVI`).

---

### Screen 2: Demo Detail Page (`/demo/<slug>` — reference: `tcp-handshake`)

**Purpose:** Reader engages with one full demonstration: prose intro, interactive demo, prose explanation, further reading, related articles.

**Page wrapper:** Same masthead and footer as landing.

**Article container:** max-width 1240px, centered, padding `48px var(--pad-x) calc(var(--pad-y) * 1.2)`.

**Sections, top to bottom:**

#### 1. Back link
- Mono 11px uppercase 0.08em letter-spacing, `--ink-mute`, margin-bottom 48px.
- Text: `← Back to the index`. Hover → `--accent`. Click → `/`.

#### 2. Article header
- Max-width 760px, centered.
- Meta row — Mono 11px uppercase, `--ink-mute`, items separated by `·` dot dividers: `Networking · 12 min · Apr 2026`. Margin-bottom 24px.
- h1 — Source Serif 400, `clamp(40px, 5vw, 72px)`, line-height 1.05, letter-spacing -0.02em, `text-wrap: balance`, margin-bottom 24px. Text: “A conversation in three packets”.
- Dek — Source Serif italic, `clamp(20px, 1.6vw, 24px)`, line-height 1.45, `--ink-soft`, max-width 50ch, margin-bottom 32px.
- Byline row — Mono 11px uppercase: `By M. Halberstam · Illustrations by the editors`.

#### 3. Rule
- Hairline `1px solid var(--rule)` at 0.5 opacity, max-width 760px, 56px vertical margin.

#### 4. Prose intro
- Container max-width 660px, centered, margin-bottom 48px.
- First paragraph has a drop-cap: italic Source Serif 80px, line-height 0.8, float-left, padding 6px 14px 0 0, `--accent`. The drop-cap is the first letter (`A`).
- Paragraphs — Source Serif 19px, line-height 1.6, `--ink`, margin-bottom 24px, `text-wrap: pretty`.
- `<em>` → italic, `--accent-2`.

#### 5. **Interactive demo block** ⭐

This is the heart of the page. See **TCP Handshake Demo** spec below.

#### 6. Prose explanation
- Same prose container. Two h3s: “What just happened” and “Why this is interesting”.
- h3 — Source Serif 400, 28px, margin-top 48px, margin-bottom 16px.
- Inline `<code>` — Mono 15px, `--bg-2` background, padding 1px 6px, border-radius 3px, `--accent` color.

#### 7. Aside (Further reading)
- Max-width 660px, centered, margin 48px auto, padding 24px 28px.
- Background `--bg-2`, left border `3px solid var(--accent)`, border-radius `0 3px 3px 0`.
- h6 — Mono 11px uppercase 0.08em letter-spacing, `--ink-mute`.
- ul/li — no list style, 6px vertical padding.
- a — Source Serif 16px, `--ink`, bottom border `--rule-soft`. Hover → `--accent`.

Three placeholder links: RFC 9293, “The QUIC handshake, in two acts”, “What a packet capture looks like at scale”.

#### 8. Related articles
- Max-width 1080px, centered, margin-top 80px, top border `--rule-soft`, padding-top 48px.
- h3 — Source Serif 400, 28px, margin-bottom 32px.
- 3-column grid, gap 32px. Each card: padding 20px 0, top border `1px solid var(--rule)` (full strength), cursor pointer, flex-column gap 10px.
- Hover: padding-left 8px, h4 → `--accent`.
- Card content: kicker (`--accent`), h4 (Source Serif 400, 22px, line-height 1.15), read time pinned to bottom (Mono 11px, `--ink-mute`).

Show three demos other than the current one (slice 0..3).

---

## The TCP Handshake Demo (the interactive demo)

The interactive demo embedded in the demo detail page. Self-contained component, ports cleanly to React/Vue/Svelte.

### Container
- Max-width 1080px, centered. Margin 64px auto.
- Padding 40px. Background `--bg-2`. 1px border `--rule-soft`. Border-radius 4px.

### Demo header (above the interactive widget)
- Kicker `— Demonstration` (mono uppercase).
- h2 — Source Serif 400, 32px, letter-spacing -0.01em, margin 8px 0. Text: “Watch a connection form”.
- p — Source Serif 16px, `--ink-soft`. Text: “Set the latency, optionally drop a packet, and follow the three messages.”

### The widget itself

Three vertical sections in a single bordered container (`--bg` background, `--rule-soft` border, border-radius 3px):

#### A. Stage (320px tall)

- 3-column grid: `200px 1fr 200px`. Bottom border `--rule-soft`.
- **Client lane** (left, padding 20px, right border `--rule-soft`):
  - Lane label — Mono 11px uppercase 0.12em letter-spacing. Two lines: `CLIENT`, then below in 10px lowercase `10.0.0.42`.
  - State pill (below label, self-start): Mono 10px, padding 5px 8px, 1px border `--rule-soft`, border-radius 2px, `--bg-2` background. Cycles `CLOSED → SYN_SENT → SYN_SENT → ESTABLISHED → ESTABLISHED`. State color rules:
    - `ESTABLISHED`: cyan border + cyan text, transparent background.
    - `SYN_SENT` / `SYN_RECEIVED`: `--ink` border + `--ink` text.
    - `CLOSED` / `LISTEN`: default soft.
- **Server lane** (right, mirrored): label `SERVER` / `substrate.press`. State cycles `LISTEN → LISTEN → SYN_RECEIVED → SYN_RECEIVED → ESTABLISHED`.
- **Track** (center): repeating horizontal grid lines (`repeating-linear-gradient(to bottom, --rule-soft 0 1px, transparent 1px 24px)`). Holds animating packet elements.
- **Time axis** (absolute, bottom 8px, between the two lanes): Mono 9px `--ink-mute`. Three labels left/center/right: `t = 0` / `roundtrip` / `t = <3 × latency>s`.

#### B. Controls panel
- Padding 20px. Bottom border `--rule-soft`. Vertical flex, gap 16px.
- **Row 1** (flex, align-center, gap 20px, wrap):
  - Primary button — pill, padding 14px 22px, 14px font, 500 weight, `--ink` background, `--bg` text. Hover: `--accent` background, slight `translateY(-1px)`. Disabled: opacity 0.5. Label cycles: `Begin handshake` → `Running…` (disabled while running) → `Run again`.
  - “Reset” link button (right of primary): `--ink-soft`, 14px, dotted `--rule-soft` underline, hover → `--accent`.
  - **Latency control** (margin-left auto, push right):
    - Label `One-way latency` — Mono 11px uppercase, `--ink-mute`.
    - Range input, min 300, max 1600, step 100, default 900. Width 140px, accent-color `--accent`. Disabled while running.
    - Value readout — Mono 11px, `--ink`, fixed width 50px, format `<n>ms`.
- **Row 2 — drop chips** (padding-top 16px, top border `1px dashed var(--rule-soft)`):
  - Label `Drop a packet:` — Mono 11px uppercase, `--ink-mute`.
  - Three checkbox chips for `SYN`, `SYN · ACK`, `ACK`:
    - Default: Mono 11px, padding 6px 12px, 1px border `--rule-soft`, border-radius 2px, `--ink-soft` text.
    - Hover: border `--ink-soft`.
    - Active (`.on`): border `--accent`, text `--accent`, background `rgba(127,212,216,0.1)`.

#### C. Event log
- Padding 16px 20px. Max-height 200px, overflow-y auto.
- Mono 11px throughout.
- Log header (flex, space-between, padding-bottom 8px, bottom border `--rule-soft`):
  - Left: `EVENT LOG` — 10px uppercase 0.08em letter-spacing, `--ink-mute`.
  - Right: `<n> entries` — same styling.
- Empty state: italic `--ink-mute` line `— begin the handshake to record events`.
- Each row: 2-column grid `90px 1fr`, gap 12px, line-height 1.4.
  - Timestamp (HH:MM:SS.mmm) — `--ink-mute` 10px.
  - Message — color depends on tone: `info` → default, `warn` → `--accent`, `good` → `--ink`, `done` → `--accent` 500 weight.

### Behavior

State machine driven by `step` (0..4):

| step | meaning |
|---|---|
| 0 | idle |
| 1 | SYN in flight |
| 2 | SYN-ACK in flight |
| 3 | ACK in flight |
| 4 | established |

**Sequence on `Begin handshake`:**
1. Set step=1. Send SYN client→server. Log: `SYN sent`.
2. After `latency` ms (one-way), log: `SYN received`. Set step=2. Send SYN-ACK server→client.
3. After `latency` ms, log: `SYN·ACK received`. Set step=3. Send ACK client→server.
4. After `latency` ms, log: `ACK received`. Set step=4. Set `running=false`. Log: `Connection established · ESTABLISHED` (tone=`done`).

**Drop logic:** If a drop chip is checked when a packet is sent:
- Log warns `<kind> sent · will be lost in transit` immediately.
- After `latency * 0.55` ms, the packet visually fades out at the midpoint (50% top), and log warns `<kind> lost · timeout, retransmitting…`.
- After 700 ms, automatically clear the drop flag for that kind (one-shot) and re-call `send()` for the same kind. Animation continues from the resend.
- Drop chips are user-toggleable mid-run; effect applies to the next packet send.

**Packet animation:**
- Each packet renders as an absolutely-positioned card in the track (`--bg-2` background, 1px border, border-radius 2px, padding 8px 14px, min-width 110px).
- Two-line content: kind label (e.g., `SYN`, `SYN · ACK`, `ACK`) — Mono 11px 500 weight 0.08em letter-spacing — and below in Mono 9px `--ink-mute`: `seq=<1000 + id*7>`.
- Border color per kind: SYN/ACK = `--ink`, SYN·ACK = `--accent` (also text color).
- Dropped packets render with `border-style: dashed`.
- Animation: position via `top` percentage of track, animated with CSS transition `top <duration>ms cubic-bezier(0.5, 0.05, 0.5, 0.95)`. `cs` direction (client→server) animates 12% → 88% top. `sc` direction reverses. Dropped packets animate to 50% (midpoint) over `duration * 0.55`, then fade opacity to 0 with `transition: opacity 300ms <duration*0.55>ms`.
- Garbage-collect arrived packets after `duration + 800` ms.

**Reset:** clears all timers, resets step to 0, empties packet list, empties log. Drop chips retain their checked state.

---

## Interactions & Behavior (cross-cutting)

- **Routing:** Two routes — `/` (landing) and `/demo/<slug>`. The prototype uses hash routing (`#/`, `#/demo/tcp-handshake`); production should use the framework's standard router (Next.js app router, etc.) with real paths.
- **Hover transitions:** All interactive elements use `transition: <prop> 0.15s` unless noted. Color shifts are color-only (no underline state changes); list rows shift padding to suggest motion.
- **No emoji.** No icons except minimal arrows (`←`, `→`) inline in copy as text characters.
- **Cursor:** All clickable headings, cards, list rows use `cursor: pointer`.
- **No animations on initial page load** — content appears statically. The TCP demo is the only animated surface.

---

## State Management

For the landing and detail pages, no client state beyond routing.

For the **TCP demo** component, local state:

```ts
interface TCPDemoState {
  running: boolean;        // whether a sequence is in flight
  step: 0|1|2|3|4;          // handshake stage
  packets: Packet[];        // currently-rendered animating packets
  drops: { syn: boolean; synack: boolean; ack: boolean }; // drop toggles
  latency: number;          // 300..1600, step 100
  log: LogEntry[];          // append-only event log
}

interface Packet {
  id: number;               // monotonic from a ref
  kind: 'syn' | 'synack' | 'ack';
  dir: 'cs' | 'sc';         // client→server or server→client
  t0: number;               // performance.now() at send
  dur: number;              // = latency
  dropped?: boolean;
  droppedShown?: boolean;   // true after midpoint reached
}

interface LogEntry {
  t: string;                // HH:MM:SS.mmm
  msg: string;
  tone: 'info' | 'warn' | 'good' | 'done';
}
```

Use refs for: timer IDs (cleanup on unmount), monotonic packet ID counter.

A `setInterval` running every 400 ms garbage-collects packets older than `dur + 800` ms.

---

## Assets

No external assets are required.

The card thumbnail SVGs are inline schematic placeholders (timeline diagrams, tree, pipeline boxes, binary search visualization, cache grid, HTTP request/response). They live in `app.jsx` as the `DemoIllustration` component, switched on `slug`. Replace these with real editorial illustrations or technical diagrams in production.

---

## Files in this handoff

| File | What it is |
|---|---|
| `Substrate.html` | Entry HTML. Loads React 18 + Babel standalone (prototype only) + Google Fonts. Sets `data-variant="b"` and `data-density="regular"` on `<html>`. |
| `app.jsx` | Single-file React app. Contains: hash router, `DEMOS` data, masthead/footer for both variants (production uses only B), hero/list/manifesto/departments sections, demo detail page, `TCPHandshakeDemo` component, `DemoIllustration` placeholder SVGs. |
| `styles.css` | All CSS. Tokens at top, then variant bindings, then per-section styles. Variant A styles can be ignored — keep only `[data-variant="b"]` paths plus shared rules. |
| `tweaks-panel.jsx` | Prototype-only design-review tooling. **Do not port.** Remove for production. |
| `README.md` | This document. |

---

## Notes for the implementer

1. **Drop the Tweaks panel and Variant A entirely** — production is locked to Variant B / regular density. You can simplify CSS by collapsing `--bg`/`--ink`/etc. directly to the Variant B values rather than carrying the variant data attribute.
2. **Replace the prototype's hash router** with the target framework's router. Each demo gets a real route at `/demo/<slug>`.
3. **The TCP demo logic is sound and self-contained** — it can be lifted into a single React/Vue/Svelte component. Use `setTimeout` chains keyed by ID array (so reset can clear them all). Use `requestAnimationFrame`-driven CSS transitions, not JS interpolation, for packet motion — performance is better and behavior matches the prototype.
4. **Fonts:** use `next/font` (Next.js) or equivalent for self-hosting Source Serif 4, Inter Tight, JetBrains Mono. The prototype loads from Google Fonts directly which is fine for review but adds latency in production.
5. **Article body** in the demo detail page is sample copy. The CMS / content layer should provide: title, dek, kicker, author, date, read-time, body (MDX or similar), aside-links, demo-component-name (for embedding the right interactive widget mid-article).
6. **Empty state for article list when filtered:** not designed. Add when implementing categories.
7. **Mobile:** the brief specified desktop-only and the prototype has minimal responsive behavior (a single 1100px breakpoint that hides thumbnails and reflows the hero). Production likely needs proper mobile design — request that work separately.
