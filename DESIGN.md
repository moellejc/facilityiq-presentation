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

## Page templates

| Class | Role |
| --- | --- |
| `.tpl-title` | Title / opening — brand lockup, hero headline, CTA |
| `.tpl-bullets` | Simple text + hairline bullet list |
| `.tpl-split` | Two-column narrative + numbered feature list |
| `.tpl-metrics` | Headline + mid-deck metric strip |
| `.tpl-flow` | Animated process flow (connectors + pulse nodes) |
| `.tpl-system` | Complex orbital system diagram with motion |
| `.tpl-thanks` | Close / thank-you with contact line |

Mark each slide with `data-slide`, `data-preview` (overview label), and `data-section` (footer label).

## Slide overview drawer

Bottom pull-up panel for jumping between slides:

- Peek handle at the bottom center, or the overview button in the footer nav
- Horizontal strip of numbered previews (index + title — not screenshot cards)
- Click a preview → `goTo(index)` + close drawer
- `o` toggles · `Esc` closes · swipe up from bottom opens · swipe down closes
- Scrim dim behind the panel

## Motion

- Slide enter/exit: soft vertical drift (~420–700ms, ease-out)
- Staggered `.reveal` children on the active slide
- Flow / system diagrams animate only while `.slide.is-active`
- Respect `prefers-reduced-motion`

## Do / Don't

**Do**

- Keep the title viewport: brand, one headline, one lede, one CTA group, one visual plane
- Extend via tokens first, then template classes
- Use `data-preview` so the overview stays accurate

**Don't**

- Purple gradients, glow stacks, pill clusters, or dashboard chrome in the hero
- Cards in the hero or as default content containers
- Metrics or secondary content in the first viewport
