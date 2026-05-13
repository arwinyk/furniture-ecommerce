---
name: Ethereal Hearth
colors:
  surface: '#fcf9f5'
  surface-dim: '#dcdad6'
  surface-bright: '#fcf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ef'
  surface-container: '#f0ede9'
  surface-container-high: '#eae8e4'
  surface-container-highest: '#e5e2de'
  on-surface: '#1c1c1a'
  on-surface-variant: '#4f453b'
  inverse-surface: '#31302e'
  inverse-on-surface: '#f3f0ec'
  outline: '#807569'
  outline-variant: '#d2c4b7'
  surface-tint: '#78592f'
  primary: '#78592f'
  on-primary: '#ffffff'
  primary-container: '#c09a6b'
  on-primary-container: '#4c320c'
  inverse-primary: '#e9bf8e'
  secondary: '#705a4c'
  on-secondary: '#ffffff'
  secondary-container: '#f8dac8'
  on-secondary-container: '#755e50'
  tertiary: '#805533'
  on-tertiary: '#ffffff'
  tertiary-container: '#ca956f'
  on-tertiary-container: '#522e10'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffddb6'
  primary-fixed-dim: '#e9bf8e'
  on-primary-fixed: '#2a1800'
  on-primary-fixed-variant: '#5d411a'
  secondary-fixed: '#fbddca'
  secondary-fixed-dim: '#dec1af'
  on-secondary-fixed: '#28180d'
  on-secondary-fixed-variant: '#574335'
  tertiary-fixed: '#ffdcc5'
  tertiary-fixed-dim: '#f4bb92'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#653d1e'
  background: '#fcf9f5'
  on-background: '#1c1c1a'
  surface-variant: '#e5e2de'
  espresso: '#1B1410'
  cedar: '#5C4033'
  champagne: '#D4B896'
  linen: '#EDE0CF'
  cream: '#F7F2EB'
  noir: '#0F0D0B'
  border-subtle: rgba(92, 64, 51, 0.10)
  shadow-warm: rgba(60, 35, 20, 0.12)
typography:
  display-lg:
    fontFamily: Cormorant Garamond
    fontSize: 64px
    fontWeight: '300'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Cormorant Garamond
    fontSize: 40px
    fontWeight: '300'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Cormorant Garamond
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Cormorant Garamond
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Jost
    fontSize: 18px
    fontWeight: '300'
    lineHeight: '1.6'
  body-md:
    fontFamily: Jost
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Jost
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.12em
  label-sm:
    fontFamily: Jost
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-padding: 120px
  container-padding-mobile: 24px
  gutter: 32px
  section-gap: 160px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The design system is crafted for a high-end furniture retail experience that bridges the gap between digital interface and editorial print. The brand personality is **Cinematic, Sophisticated, and Artisanal**, targeting an affluent audience that values slow living and heritage craftsmanship. 

The aesthetic leverages **Modern Minimalism with Tactile layering**. It prioritizes extreme negative space (120px+ layout containers) to allow product photography to breathe, creating an "art gallery" feel. The use of warm-toned ivory instead of pure white, combined with organic textures and soft glassmorphism, evokes a sense of physical comfort and luxury.

- **Minimalism:** Heavy whitespace and high-quality serif typography.
- **Glassmorphism:** Used for navigation and overlays to maintain a sense of depth and airy lightness.
- **Tactile:** Soft, warm shadows that suggest objects are resting on a physical surface.

## Colors

This design system rejects digital clinicalism by banning pure black (#000) and pure white (#FFF). Instead, it utilizes a "Harvest Palette" of ivories, woods, and metals.

- **Primary (Gold):** Used for calls-to-action and critical highlights.
- **Secondary (Walnut):** The foundational color for structural elements and heavy text.
- **Tertiary (Terracotta):** An accent for storytelling elements and secondary interactions.
- **Neutral (Ivory):** The primary canvas color, providing a warm, parchment-like background.

Functional colors for borders and shadows are strictly derived from the Cedar and Walnut hues to maintain a monochromatic warmth across the interface.

## Typography

The typography strategy relies on the contrast between the literary, high-contrast **Cormorant Garamond** and the geometric, functional **Jost**.

- **Display & Headings:** Use Cormorant Garamond with light weights (300) for a graceful, editorial appearance. Tighter letter spacing is applied to large headlines to maintain visual tension.
- **Body & UI:** Jost provides modern legibility. Use weight 300 for long-form product descriptions to maintain the "airy" feel, and 500 for functional labels.
- **Systemic Rule:** All primary buttons and category headers must use the `label-caps` style to provide a structured, architectural counterpoint to the fluid serif headings.

## Layout & Spacing

The design system utilizes a **Fixed Grid** philosophy for desktop to preserve editorial compositions, transitioning to a **Fluid Grid** for mobile.

- **Desktop (1440px+):** 12-column grid with 120px side margins and 32px gutters. Section vertical spacing is aggressive (160px) to force focus on individual furniture pieces.
- **Tablet (768px - 1439px):** Margins reduce to 64px. Gutters remain 32px.
- **Mobile (<767px):** 4-column fluid grid with 24px margins.

**Key Layout Rules:**
- **Asymmetry:** Use offset columns for image placement to create a "scrapbook" editorial look.
- **Layering:** Elements (like text or labels) should frequently overlap image boundaries by 20-40px to create depth.

## Elevation & Depth

Depth is achieved through **Tonal Layering** and **Organic Shadows**, avoiding the harshness of standard material elevation.

- **Shadow Character:** Use a multi-layered shadow approach with warm brown tints (`rgba(60, 35, 20, 0.12)`). Shadows should have a large blur radius (30px+) and low spread to simulate natural, ambient room lighting.
- **Glassmorphism:** Applied to the primary navigation bar and modal overlays. Use `rgba(253, 250, 246, 0.72)` with a 20px backdrop blur. A 1px solid border in Gold (#C09A6B) at 20% opacity must be used to define the edges of glass elements.
- **Z-Indexing:** Product images sit at base level; descriptive text cards sit at +1 elevation with warm shadows; navigation sits at the highest tier with glassmorphism.

## Shapes

The shape language is "Softly Architectural." It balances the strict geometry of modern furniture with the comfort of organic curves.

- **Standard Elements:** 0.5rem (8px) for small UI components.
- **Cards & Containers:** 1rem (16px) for product cards and main content blocks to soften the "boxiness" of the grid.
- **Interactive Elements:** Buttons utilize a full pill-shape (100px radius) to stand out as clearly touchable, distinct objects against the rectangular grid.
- **Input Fields:** 0.75rem (12px) for form fields to provide a middle ground between the sharpness of the grid and the roundness of the buttons.

## Components

### Buttons
- **Primary:** Pill-shaped, Gold (#C09A6B) background, Noir (#0F0D0B) text. Jost 500, ALL CAPS, 0.12em spacing.
- **Ghost:** Pill-shaped, 1px Walnut (#3D2B1F) border, Walnut text. Used for secondary actions.

### Cards
- **Product Card:** 16px corner radius. 4:5 aspect ratio for images. Includes a subtle warm shadow. Information (Price/Title) should be center-aligned or partially overlapping the image in a glassmorphic badge.

### Inputs
- **Text Fields:** 12px corner radius, Linen (#EDE0CF) background or 1px Espresso border at 10% opacity. Text uses Jost 300.
- **Focus State:** 1px Gold (#C09A6B) border with a soft gold outer glow.

### Navigation
- **Desktop:** Top-fixed glassmorphic bar.
- **Mobile:** Bottom tab bar for reachability, utilizing Walnut (#3D2B1F) icons on a Cream (#F7F2EB) glassmorphic base.

### Specialized Components
- **Lookbook Carousel:** A full-bleed horizontal scroll component with "parallax" image movement.
- **Material Swatch:** Circular UI chips showing wood grain or fabric textures, used in product configuration.