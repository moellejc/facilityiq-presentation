# FacilityIQ Presentation

Interactive HTML presentation system for FacilityIQ. Visual theme follows a SpaceX / x.ai darkmode language — black canvas, spectral white type, full-bleed scenes.

## Quick start

Open locally:

```bash
open index.html
```

Or serve (recommended for font loading):

```bash
python3 -m http.server 5173
# → http://localhost:5173
```

## Controls

| Input | Action |
| --- | --- |
| `→` `↓` `Space` `Enter` | Next slide |
| `←` `↑` `Backspace` | Previous slide |
| `Home` / `End` | First / last |
| Swipe | Next / previous |
| Buttons | Previous / next |

Deep links use hash IDs: `#title`, `#mission`, `#problem`, …

## Structure

```
├── index.html              # Example briefing deck
├── DESIGN.md               # Visual system
├── css/
│   ├── fonts.css           # Web font loads
│   ├── tokens.css          # Design tokens
│   ├── presentation.css    # Deck chrome & navigation
│   └── slides.css          # Slide layouts
├── js/
│   └── presentation.js     # Navigation engine
├── assets/                 # Images / media
└── slides/                 # Optional modular slide content
```

## Extending

1. Duplicate a `<section class="slide" data-slide>` in `index.html`.
2. Give it a unique `id` for hash navigation.
3. Prefer existing templates (`.slide--hero`, `.slide--statement`, `.slide--close`) and tokens from `css/tokens.css`.
4. See [DESIGN.md](./DESIGN.md) before inventing new UI patterns.

## Example deck

The included briefing covers title → mission → problem → product → capabilities → close. Replace copy for your audience; keep the composition rules.
