---
name: Aether Automotive Studio
colors:
  surface: '#f7f9fc'
  surface-dim: '#d8dadd'
  surface-bright: '#f7f9fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f7'
  surface-container: '#eceef1'
  surface-container-high: '#e6e8eb'
  surface-container-highest: '#e0e3e6'
  on-surface: '#191c1e'
  on-surface-variant: '#45474b'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f4'
  outline: '#76777b'
  outline-variant: '#c6c6cb'
  surface-tint: '#5c5e65'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#191c22'
  on-primary-container: '#81848b'
  inverse-primary: '#c4c6ce'
  secondary: '#575f6c'
  on-secondary: '#ffffff'
  secondary-container: '#d8e0ef'
  on-secondary-container: '#5b6370'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#0d1c2e'
  on-tertiary-container: '#76859b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e1e2eb'
  primary-fixed-dim: '#c4c6ce'
  on-primary-fixed: '#191c22'
  on-primary-fixed-variant: '#44474e'
  secondary-fixed: '#dbe3f2'
  secondary-fixed-dim: '#bfc7d6'
  on-secondary-fixed: '#141c27'
  on-secondary-fixed-variant: '#3f4753'
  tertiary-fixed: '#d5e3fc'
  tertiary-fixed-dim: '#b9c7e0'
  on-tertiary-fixed: '#0d1c2e'
  on-tertiary-fixed-variant: '#3a485c'
  background: '#f7f9fc'
  on-background: '#191c1e'
  surface-variant: '#e0e3e6'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 56px
    fontWeight: '400'
    lineHeight: 64px
    letterSpacing: -0.035em
  display-lg-mobile:
    fontFamily: Geist
    fontSize: 36px
    fontWeight: '400'
    lineHeight: 44px
    letterSpacing: -0.025em
  headline-xl:
    fontFamily: Geist
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 48px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Geist
    fontSize: 28px
    fontWeight: '400'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 24px
    letterSpacing: -0.015em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: -0.005em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  label-caps:
    fontFamily: Geist
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.08em
  label-md:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: -0.005em
  metric-val:
    fontFamily: Geist
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: -0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
The design system establishes a high-precision, gallery-grade atmosphere tailored for luxury and performance vehicle specification. Inspired by Scandinavian industrial reduction and refined high-tech presentation, it presents the digital product as a physical sculpture in an architectural daylight studio.

### Design Principles
- **Atmospheric Transparency:** Interface chrome never obstructs the product. Controls exist as floating lenses of frosted glass that subtly refract the studio floor and vehicle surfaces.
- **Sculptural Restraint:** Visual hierarchy is governed by strict typography, quiet tonal differences, and generous negative space rather than decorative accents or saturated fills.
- **Tactile Precision:** Interactive surfaces respond with physical weight—measured micro-transitions, crisp borders with dynamic specular edge lighting, and low-amplitude elevation changes.
- **Form Follows Function:** Dense configuration data is compartmentalized into serene floating modules, allowing full focus on form, material textures, and finishes.

## Colors
The palette relies on a nuanced spectrum of architectural light grays, optical whites, and deep technical slates. Saturated accent colors are deliberately avoided to ensure that vehicle paint options, upholstery swatches, and rim finishes remain the primary visual focal points.

### Palette Architecture
- **Canvas Base:** Subtle vertical daylight gradient spanning from `#f5f6f8` at the zenith to `#e2e5eb` at the ground line, simulating an infinity-cove automotive studio.
- **Primary Ink (`#16191f`):** Deep graphite slate utilized for primary headlines, active states, key pricing callouts, and dominant interactive buttons.
- **Secondary Ink (`#5e6673`):** Neutral anodized slate for descriptions, structural labels, inactive icon states, and secondary telemetry.
- **Active Accent (`#253346`):** Deep marine graphite applied sparingly to indicate active selection boundaries, radio dot indicators, and subtle focal toggles.
- **Glass Surfaces:** Semi-translucent white layers ranging between `rgba(255, 255, 255, 0.48)` and `rgba(255, 255, 255, 0.72)`.
- **Specular Edge:** `rgba(255, 255, 255, 0.85)` outer boundary hairline strokes paired with an inward drop-border of `rgba(22, 25, 31, 0.04)`.

## Typography
Typographic composition balances the geometric precision of Geist with the reading performance of Inter.

### Hierarchy & Treatment
- **Display and Headers:** Rendered exclusively in Geist with negative tracking to convey mechanical calibration, industrial confidence, and lightness.
- **Technical Metrics & Value Readouts:** Styled with tabular numbers (`tnum`) in Geist medium weight to prevent layout shift during price, acceleration, or range calculations.
- **Labels & Micro-data:** Set in `label-caps` with uppercase transformation and positive tracking (`0.08em`) to mimic vehicle badging and cockpit instrument markings.
- **Body & Longform:** Rendered in Inter with generous line height for effortlessly legible option descriptions, warranty notes, and technical package breakdowns.

## Layout & Spacing
The layout operates as a layered viewport system: a permanent full-bleed 3D staging canvas overlaid with floating, decoupled glass viewports and docked controls.

### Viewport Structure
- **Staging Canvas:** 100vw × 100vh viewport anchoring the active vehicle render. The ground plane is locked to the lower 35% of the frame.
- **Top Navigation Strip:** Floating glass island anchored with a 24px margin from the viewport top edge, housing model switching and configuration summaries.
- **Inspector Rail (Desktop):** A 400px–460px right-hand floating frosted panel, inset 24px from top, bottom, and right view edges. Contains structured accordion groups (Exterior, Wheels, Interior, Options).
- **Floating Pill Dock (Bottom):** Centered floating controller fixed 32px above the screen bottom, dedicated to quick-action rotation nodes, camera views, and total build pricing.

### Responsive Behavior
- **Desktop (1280px and above):** Dual layout with dominant 3D staging and a persistent right-hand glass panel.
- **Tablet (768px – 1279px):** Inspector moves to an overlay glass sheet that docks along the bottom edge, expanding on interaction to 50vh.
- **Mobile (below 768px):** Staging takes the top 55% of vertical space; configuration panels collapse into a swipeable bottom drawer with quick-action horizontal swatch carousels.

## Elevation & Depth
Elevation is achieved using multi-layered optical refraction, blurred backdrops, and diffused atmospheric light casts instead of opaque drop shadows.

### Glassmorphic Layers
- **Substrate Level (Canvas Overlay):** 
  - Fill: `rgba(255, 255, 255, 0.42)`
  - Filter: `backdrop-filter: blur(24px) saturate(180%)`
  - Border: `1px solid rgba(255, 255, 255, 0.65)`
  - Shadow: `0 8px 32px -4px rgba(22, 25, 31, 0.04), 0 2px 8px -2px rgba(22, 25, 31, 0.02)`

- **Interactive Hover & Drawer Level:**
  - Fill: `rgba(255, 255, 255, 0.68)`
  - Filter: `backdrop-filter: blur(32px) saturate(200%)`
  - Border: `1px solid rgba(255, 255, 255, 0.9)`
  - Shadow: `0 16px 40px -8px rgba(22, 25, 31, 0.07), 0 4px 12px -2px rgba(22, 25, 31, 0.03)`

- **Active Floating Pills & Popovers:**
  - Fill: `rgba(255, 255, 255, 0.82)`
  - Filter: `backdrop-filter: blur(40px) saturate(210%)`
  - Border: `1px solid #ffffff`
  - Shadow: `0 20px 48px -10px rgba(22, 25, 31, 0.09), 0 1px 3px 0 rgba(22, 25, 31, 0.04)`

### Specular Edge Highlight
Every frosted glass component features an inner glow created via `box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.8)` to simulate the beveled edge of precision architectural glass.

## Shapes
Geometry is calm, fluid, and continuous. Sharp corners are avoided entirely in favor of refined curvature that complements modern automotive aerodynamics.

### Curvature Matrix
- **Structural Glass Panels & Modals:** Large radius (`rounded-xl` / 24px) to retain an architectural, floating aesthetic.
- **Interactive Tiles, Option Cards & Form Containers:** Medium radius (`rounded-lg` / 16px) for nested harmony within outer glass frames.
- **Interactive Controls, Swatches, Floating Dock Pills, & Buttons:** Full continuous pill curvature (`rounded-full` / 9999px) to invite direct physical touch and intuitive click interaction.
- **Color Swatches:** Concentric circles featuring a 4px interior clearance ring that separates the material color disc from outer selection indicators.

## Components

### Buttons
- **Primary Action (e.g., "Reserve Specification", "Order Now"):** Full pill (`rounded-full`), solid `#16191f` fill, crisp white text (`Geist 14px/500`). Hover transitions to `#253346` with a micro-scale of `1.015` and a soft ambient shadow.
- **Secondary Glass Action:** Full pill, `rgba(255, 255, 255, 0.5)` background, `1px solid rgba(255, 255, 255, 0.8)`, `#16191f` text. Hover increases fill opacity to `0.8`.
- **Icon Utility Buttons (e.g., Camera 360, Fullscreen, Share):** 44px circular glass disks with centered 18px icons in `#16191f`.

### Swatch Selectors (Paint, Interior & Wheels)
- **Geometry:** 48px overall diameter. Center features a 36px circular material disc capturing real metallic flakes or leather grain patterns.
- **States:** Inactive state displays a subtle `1px solid rgba(0, 0, 0, 0.08)` border. Selected state introduces a concentric outer ring in `#16191f` with a 3px breathable white gap between the indicator and the swatch core.

### Floating Pill Dock
- Inset bottom-center controller with horizontal layout. Houses interactive segments: Camera presets (Exterior, Cockpit, Details), Door open/close triggers, and real-time total build cost.
- Encased in a continuous glass bar (`padding: 6px`, `backdrop-filter: blur(28px)`), dividing items with subtle vertical hairline separators (`rgba(22, 25, 31, 0.08)`).

### Option Cards & Packages
- **Layout:** Nested within the right-hand glass inspector rail.
- **Resting:** `rgba(255, 255, 255, 0.35)` background with `1px solid rgba(255, 255, 255, 0.5)`. Padding: 16px.
- **Selected:** `rgba(255, 255, 255, 0.8)` background with `1.5px solid #16191f` and a check indicator. Includes title, package highlights, and additive price difference (`+ $3,800`).

### Checkboxes & Radio Controls
- Custom minimalist circles. Radio displays an inner 6px `#16191f` dot encased within a 20px glass disc with a 1.5px border. Checkbox features a precise 1.5px stroke checkmark inside a 20px rounded-sm container.

### Performance Spec HUD
- Monospaced typographic cluster pinned to bottom left: 0–60 mph, Top Speed, Range, and Peak Power. Numbers render in Geist Display at 22px, paired with tiny uppercase secondary metric labels (`label-caps`).