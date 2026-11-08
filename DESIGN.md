# FacilityIQ Presentation Design System

Visual language inspired by [SpaceX](https://www.spacex.com/) and [x.ai](https://x.ai/bot) dark surfaces.

## Principles

1. **Black canvas first** — `#000000` / near-void backgrounds; atmosphere from soft radial washes and a faint grid, not colored themes.
2. **Spectral white type** — primary text is `#f0f0fa`, not pure white; muted layers for hierarchy.
3. **Full-bleed scenes** — each slide is one viewport composition. No inset hero cards.
4. **Brand as hero** — on the title slide, `FacilityIQ` is the dominant signal before the headline.
5. **No decorative cards** — content sits on the canvas; lists use hairline rules, not bordered panels.
6. **One ghost CTA** — SpaceX-style translucent button with a light stroke and 4px radius.
7. **Industrial typography** — condensed uppercase display with tracked labels; mono for indices and system lines.

## Tokens

Defined in `css/tokens.css`:

| Token | Role |
| --- | --- |
| `--fiq-black` / `--fiq-void` | Page canvas |
| `--fiq-white` (`#f0f0fa`) | Primary type / accent |
| `--fiq-white-muted` / `--fiq-white-dim` | Secondary / tertiary type |
| `--fiq-stroke` | CTA and control borders |
| `--fiq-font-display` / `--fiq-font-body` | DIN-like stack (Barlow Condensed + Barlow) |
| `--fiq-radius-cta` (`4px`) | Primary button radius |

## Type scale

- **Hero / display** — uppercase, condensed, tight leading, light tracking
- **Eyebrow / caption** — small caps tracking (~0.08em)
- **Body / lede** — sentence case, muted spectral white
- **Mono** — slide indices, system footers

## Motion

- Slide enter/exit: soft vertical drift (~420–700ms, ease-out)
- Staggered `.reveal` children on the active slide
- Hero orbital pulse (subtle scale/opacity) — disable under `prefers-reduced-motion`

## Slide templates

| Class | Use |
| --- | --- |
| `.slide--hero` | Title with brand lockup + full-bleed visual plane |
| `.slide--statement` | Mission / thesis — headline + lede |
| `.slide` + `.slide__grid--split` | Problem / capabilities two-column |
| `.slide--close` | Closing / next steps |

## Do / Don't

**Do**

- Keep the first viewport: brand, one headline, one lede, one CTA group, one visual plane
- Use uppercase sparingly for display and labels; keep body readable
- Extend via tokens first, then components

**Don't**

- Purple gradients, glow stacks, pill clusters, or dashboard chrome in the hero
- Cards in the hero or as default content containers
- Flat single-color pages with no atmospheric depth
