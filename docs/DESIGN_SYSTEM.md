## Colors

palette evokes **trust, reliability, and financial clarity**, with deep blues for stability and orange as a decisive action accent.

### Primary palette

| Name      | Hex       | HSL (recommended) |
| --------- | --------- | ----------------- |
| Orange    | `#FA9819` | `34 96% 54%`      |
| Blue Tint | `#B6C9CF` | `194 21% 76%`     |
| Baby Blue | `#C6EBF7` | `195 75% 87%`     |
| White     | `#FFFFFF` | `0 0% 100%`       |
| Black     | `#000000` | `0 0% 0%`         |

### Secondary palette

| Name        | Hex       | HSL (recommended) |
| ----------- | --------- | ----------------- |
| Navy        | `#1E3D59` | `208 50% 23%`     |
| Caption     | `#48749E` | `209 37% 45%`     |
| Sky Blue    | `#DEEEFE` | `210 94% 93%`     |
| Off-blue    | `#E8EBEF` | `214 18% 92%`     |
| Deep Orange | `#CD4900` | `21 100% 40%`     |
| Dark Grey   | `#A3A3A3` | `0 0% 64%`        |
| Grey        | `#E5E5E5` | `0 0% 90%`        |

### Gradients

Use gradients as **decorative surfaces/overlays** (not for the logo). Keep them subtle; prioritize legibility and contrast.

- Gradient 1: orange → blue
- Gradient 2: blue → orange
- Gradient 3: orange variants
- Gradient 4: blue variants

---

## 05 Typography

typography balances clarity and professionalism with a modern, trustworthy pairing.

- **Primary sans-serif**: _Rethink Sans Reg_ (UI, body, dashboards)
- **Secondary serif**: _Hedvig Letters Serif_ (headlines, emphasis, reports)

### Sizing / leading / tracking

| Size range  | Leading | Tracking |
| ----------- | ------- | -------- |
| 0–24 pt/px  | 130%    | 0%       |
| 24–55 pt/px | 120%    | -1%      |
| 55–72 pt/px | 110%    | -2%      |
| > 72 pt/px  | 100%    | -2%      |

---

## Appendix: Web tokens (CSS + Tailwind semantics)

This repo already exposes **semantic tokens** in `app/globals.css` (HSL values like `--primary: 201 100% 34%`) and Tailwind consumes them via `bg-background`, `text-foreground`, `ring-ring`, etc. Keep using those names; swap the values to match.

### Recommended semantic mapping (brand → tokens)

| Semantic token (existing)  | Intended use        | Brand color                           |
| -------------------------- | ------------------- | ------------------------------------- |
| `--background`             | app background      | Sky Blue `#DEEEFE` (`210 94% 93%`)    |
| `--foreground`             | primary text        | Navy `#1E3D59` (`208 50% 23%`)        |
| `--card`                   | card surface        | White `#FFFFFF` (`0 0% 100%`)         |
| `--card-foreground`        | text on card        | Navy `#1E3D59` (`208 50% 23%`)        |
| `--muted`                  | subtle surfaces     | Off-blue `#E8EBEF` (`214 18% 92%`)    |
| `--muted-foreground`       | secondary text      | Caption `#48749E` (`209 37% 45%`)     |
| `--border` / `--input`     | dividers/inputs     | Grey `#E5E5E5` (`0 0% 90%`)           |
| `--primary`                | primary UI (stable) | Navy `#1E3D59` (`208 50% 23%`)        |
| `--primary-foreground`     | text on primary     | White `#FFFFFF` (`0 0% 100%`)         |
| `--accent`                 | action highlight    | Orange `#FA9819` (`34 96% 54%`)       |
| `--accent-foreground`      | text on accent      | Navy `#1E3D59` (`208 50% 23%`)        |
| `--destructive`            | destructive states  | Deep Orange `#CD4900` (`21 100% 40%`) |
| `--destructive-foreground` | text on destructive | White `#FFFFFF` (`0 0% 100%`)         |
| `--ring`                   | focus ring          | Orange `#FA9819` (`34 96% 54%`)       |

### Tailwind usage (semantic only)

- **Surfaces**: `bg-background`, `bg-card`, `bg-popover`
- **Text**: `text-foreground`, `text-muted-foreground`
- **Actions**: `bg-primary text-primary-foreground`, `bg-accent text-accent-foreground`
- **Focus**: `ring-ring`, `focus-visible:ring-ring`
- **Borders/inputs**: `border-border`, `border-input`

### Typography implementation (recommended)

Expose font variables (e.g. `--font-body`, `--font-display`, `--font-mono`) and keep mono for code only. Target pairing: **Rethink Sans** (body/UI) + **Hedvig Letters Serif** (display).
