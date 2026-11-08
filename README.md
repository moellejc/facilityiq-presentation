# FacilityIQ Presentation

Interactive HTML presentation system for FacilityIQ. Visual theme follows a SpaceX / x.ai darkmode language — black canvas, spectral white type, full-bleed scenes.

## Quick start

```bash
open index.html
# or
python3 -m http.server 5173
# → http://localhost:5173
```

## Controls

| Input | Action |
| --- | --- |
| `→` `↓` `Space` `Enter` | Next slide |
| `←` `↑` `Backspace` | Previous slide |
| `Home` / `End` | First / last |
| `o` | Toggle slide overview |
| `Esc` | Close overview |
| Swipe left / right | Next / previous |
| Swipe up from bottom | Open overview |
| Overview handle / list button | Open overview |
| Click a preview | Jump to that slide |

Deep links use hash IDs: `#title`, `#bullets`, `#system`, …

## Page templates

The example deck demonstrates every template:

| Slide | Template | Purpose |
| --- | --- | --- |
| Title | `.tpl-title` | Brand + hero |
| Bullets | `.tpl-bullets` | Simple text + bullets |
| Split | `.tpl-split` | Narrative + feature list |
| Metrics | `.tpl-metrics` | Headline + metrics |
| Flow | `.tpl-flow` | Animated process steps |
| System | `.tpl-system` | Complex animated diagram |
| Thank you | `.tpl-thanks` | Close |

## Structure

```
├── index.html              # Template showcase deck
├── DESIGN.md               # Visual system
├── css/
│   ├── fonts.css
│   ├── tokens.css
│   ├── presentation.css    # Chrome + overview drawer
│   ├── slides.css          # Page templates
│   └── diagrams.css        # Flow + system motion
├── js/
│   └── presentation.js     # Navigation + overview
├── assets/
└── slides/
```

## Extending

1. Duplicate a `<section class="slide …" data-slide>` in `index.html`.
2. Assign a template class (`tpl-bullets`, `tpl-flow`, …).
3. Set `id`, `data-preview`, and `data-section`.
4. Prefer tokens and existing components — see [DESIGN.md](./DESIGN.md).
