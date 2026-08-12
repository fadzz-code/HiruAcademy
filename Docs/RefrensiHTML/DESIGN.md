---
name: Modern Japanese Learning System
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daea'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eefe'
  surface-container-high: '#e2e8f8'
  surface-container-highest: '#dce2f3'
  on-surface: '#151c27'
  on-surface-variant: '#564336'
  inverse-surface: '#2a313d'
  inverse-on-surface: '#ebf1ff'
  outline: '#8a7264'
  outline-variant: '#ddc1b0'
  surface-tint: '#954900'
  primary: '#954900'
  on-primary: '#ffffff'
  primary-container: '#f48220'
  on-primary-container: '#5a2a00'
  inverse-primary: '#ffb786'
  secondary: '#595e70'
  on-secondary: '#ffffff'
  secondary-container: '#dde1f8'
  on-secondary-container: '#5f6477'
  tertiary: '#625e58'
  on-tertiary: '#ffffff'
  tertiary-container: '#a59f98'
  on-tertiary-container: '#3a3731'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdcc6'
  primary-fixed-dim: '#ffb786'
  on-primary-fixed: '#311400'
  on-primary-fixed-variant: '#723600'
  secondary-fixed: '#dde1f8'
  secondary-fixed-dim: '#c1c6db'
  on-secondary-fixed: '#161b2b'
  on-secondary-fixed-variant: '#414658'
  tertiary-fixed: '#e9e1d9'
  tertiary-fixed-dim: '#ccc5be'
  on-tertiary-fixed: '#1e1b17'
  on-tertiary-fixed-variant: '#4a4641'
  background: '#f9f9ff'
  on-background: '#151c27'
  surface-variant: '#dce2f3'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  japanese-ruby:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-padding: 24px
  gutter: 16px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

This design system is built for a contemporary edtech platform catering to Indonesian students learning Japanese. The visual narrative balances professional academic rigor with a friendly, accessible "soft-tech" aesthetic. 

The style utilizes **Modern Minimalism** with **Tactile accents**. It features a white-dominant interface to reduce cognitive load during study, paired with high-quality whitespace and soft, rounded containers. To differentiate the experience, the system incorporates "Claymorphism" for illustrative elements—providing a sense of playfulness and physical depth that feels inviting rather than intimidating. 

The emotional goal is to evoke clarity, progress, and warmth, ensuring that the challenging task of language acquisition feels achievable and structured.

## Colors

The palette is anchored by a high-contrast relationship between energetic Orange and disciplined Navy. 

- **Primary (Orange):** Used exclusively for call-to-action elements, progress indicators, and active states to drive motivation.
- **Secondary (Navy):** Used for global navigation, headings, and instructional hierarchy to ground the UI in professionalism.
- **Background (Light Warm):** A subtle off-white cream used for page backgrounds to reduce eye strain and distinguish the white cards from the canvas.
- **Muted Text & Borders:** A soft grey scale ensures that the UI structure remains "quiet," allowing the educational content (Kanji, Kana, and Indonesian translations) to remain the focal point.

## Typography

The design system utilizes **Plus Jakarta Sans** for its friendly, open counters and modern geometric structure, which complements both Latin characters and Japanese glyphs.

- **Scale:** A generous typographic scale is used to create a clear "Information First" hierarchy.
- **Ruby Text:** Specialized styling for *Furigana* (small kana above Kanji) is set at 12px to ensure legibility without disrupting the line height of the primary Japanese text.
- **Contrast:** Headings use the Navy color for authority, while body copy uses the Muted Text color to maintain a soft reading experience.
- **Emphasis:** Bold weights are used sparingly for key vocabulary terms and grammatical markers.

## Layout & Spacing

The layout philosophy follows a **Fluid Grid** model with high-density padding.

- **Grid:** A 12-column system for desktop, transitioning to a single-column stack for mobile. 
- **Rhythm:** An 8px linear scale governs all spacing. 
- **Whitespace:** Large vertical gaps (48px+) are used between different learning modules to prevent the user from feeling overwhelmed.
- **Mobile Adaption:** On mobile devices, card margins are reduced to 16px, and "Display" typography scales down significantly to ensure sentence strings don't break awkwardly.

## Elevation & Depth

Depth in this design system is achieved through **Tonal Layers** and **Ambient Shadows**, avoiding heavy blacks.

- **Level 0 (Background):** The Light Warm background (#FFF7EF).
- **Level 1 (Cards):** Pure White (#FFFFFF) surfaces with a 1px soft border (#E8E8E8).
- **Level 2 (Interaction):** When hovering over a course card or button, a very soft, diffused orange-tinted shadow is applied (`0px 10px 20px rgba(244, 130, 32, 0.08)`).
- **Clay Accents:** Illustrative elements (mascots, icons) use inner shadows and soft gradients to appear 3D and "squishy," adding a tactile dimension to the flat interface.

## Shapes

The shape language is defined by a consistent "Soft-Corner" logic to reinforce the friendly brand personality.

- **Standard Elements:** Buttons and input fields use a 0.5rem (8px) radius.
- **Course Cards:** Larger containers use a 1rem (16px) or 1.5rem (24px) radius to create a distinct, friendly silhouette.
- **Progress Bars:** Fully rounded (pill-shaped) to represent a smooth, continuous journey of learning.

## Components

### Buttons
- **Primary:** Solid Orange (#F48220) with white text. High-contrast, bold weight.
- **Secondary:** Solid Navy (#2E3344) with white text for secondary actions like "View Syllabus."
- **Ghost:** Navy outline with no fill for navigation or tertiary actions.

### Cards & Progress
- **Course Cards:** White background, 24px corner radius, 1px border. Feature a prominent Orange progress bar at the bottom.
- **Progress Bars:** Dual-tone. The track is a 10% opacity version of the progress color, the fill is the solid Primary Orange.

### Learning Specifics
- **Vocabulary Chips:** Soft Navy background with white text, used for tags like "N5", "Grammar", or "Kanji".
- **Input Fields:** Large, clear inputs with an 8px radius. Active state switches border color from Grey to Orange.
- **Membership Badges:** Small, rounded-xl tags with gold/orange gradients to denote premium status or "Sensei" verified content.
- **Japanese Text Containers:** Often placed in a light-grey "well" (subtle inset surface) to differentiate example sentences from instructional text.