# BISZMUN UI theme

This is the reference for extending the current website. It documents the implemented design, including responsive exceptions. Update it when shared visual conventions change.

## Design direction

Use large, spacious sections, strong blue surfaces, clear sans-serif headings, and serif supporting copy. White, black, primary blue, and UN blue provide the main contrast. Buttons are pills; menu hover areas are rectangular. Keep backgrounds and decoration simple, with the globe, UN emblem, and photography providing visual interest.

Use the existing tokens and reusable components rather than introducing near-identical colors or controls. A page-specific override should stay local to that page.

## Implementation reference

| Source                                                                     | Responsibility                                                          |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `app/globals.css`                                                          | Color and typography tokens, base styles, dark scheme, smooth scrolling |
| `app/layout.tsx`                                                           | Locally hosted fonts, viewport configuration                            |
| `app/components/ui/button.tsx`                                             | Shared buttons and link buttons                                         |
| `app/components/HomeNavigation.tsx`                                        | Shared sidebar and top-navigation items                                 |
| `app/page.module.css`                                                      | Homepage sections, navigation, collage, loading transitions             |
| `app/components/HeroScroll.tsx`                                            | Section animation, navigation visibility and color clipping             |
| `app/components/FooterMenu.tsx`                                            | Reusable footer menu markup and external links                          |
| `app/components/FooterMenu.module.css`                                     | Footer title, underline, link spacing and hover behavior                |
| `app/components/BottomBar.tsx`                                             | Footer brand, three menu columns, copyright content                     |
| `app/components/BottomBar.module.css`                                      | Footer layout and typography                                            |
| `app/components/RegistrationSection.tsx`, `RegistrationSection.module.css` | Full-height registration call to action                                 |
| `app/components/Logo.tsx`, `ColoredLogo.tsx`                               | Reusable monochrome and colored BISZMUN logos                           |

## Color scheme

### Semantic colors

| Token                      | Current light-page value         | Use                                                                         |
| -------------------------- | -------------------------------- | --------------------------------------------------------------------------- |
| `--color-primary`          | `--color-primary-700`, `#3255a4` | Main blue surfaces, default buttons, primary text accents                   |
| `--color-un`               | `--color-un-500`, `#009edb`      | MUN wordmark segment, menu underlines, navigation hover backgrounds         |
| `--color-secondary`        | White                            | Contrasting surfaces and foregrounds where theme-aware color is appropriate |
| `--color-muted`            | `--color-secondary-100`          | Pale hero surface and subtle backgrounds                                    |
| `--color-muted-foreground` | `--color-secondary-600`          | Muted supporting text, including alert date                                 |
| White                      | `white` / `text-white`           | Text on blue surfaces; inverse button backgrounds                           |
| Black                      | `black` / `text-black`           | Text and buttons on the light About Us section                              |

Primary blue and UN blue have different roles. Use primary blue for the broad surface and UN blue as the accent. The brand wordmark colors BISZ with the surrounding foreground color and MUN with `--color-un`.

### Light-page blue scales

| Shade | Primary   | UN        |
| ----- | --------- | --------- |
| 50    | `#f4f8ff` | `#eef9ff` |
| 100   | `#e5edff` | `#dcf2ff` |
| 200   | `#cbddff` | `#bce5fe` |
| 300   | `#a7c3fa` | `#8cd1fa` |
| 400   | `#7da2f1` | `#55b8ed` |
| 500   | `#5883e2` | `#009edb` |
| 600   | `#406acb` | `#0086be` |
| 700   | `#3255a4` | `#006d9c` |
| 800   | `#274483` | `#00557b` |
| 900   | `#1f3463` | `#003e5a` |
| 950   | `#101f3f` | `#002639` |

The secondary scale aliases Tailwind's neutral scale. Use tokens rather than copying their underlying values.

### Light and dark behavior

The homepage uses `data-page-theme="light"`, which keeps its light palette regardless of the device's preferred color scheme. Other pages can inherit the global dark scheme: primary and UN scales are remapped, secondary neutrals are reversed, and the two brand pivot colors remain unchanged. The table above describes the light palette only. Wiki pages follow the system preference through the global `--page-surface`, `--page-foreground`, `--page-muted`, `--page-border`, `--page-soft`, and `--page-accent` tokens. These cover article prose, breadcrumbs, the contents sidebar, dropdowns, code, tables, and copy controls. The header and footer keep their primary-blue surfaces in both schemes.

Text selection uses UN blue with white text.

## Typography

### Font families

| Role                                                                        | Font       | Implementation                                             |
| --------------------------------------------------------------------------- | ---------- | ---------------------------------------------------------- |
| Headings, wordmarks, navigation, links, buttons and controls                | Geologica  | Inherited from the root layout                             |
| Body paragraphs, theme description, dates, footer menu titles and copyright | Noto Serif | Paragraph base style, `.text-serif`, or the serif variable |

Serif declaration:

```css
font-family: var(--font-noto-serif, Georgia), serif;
```

The root loads Geologica at weights 400, 600 and 700, and Noto Serif at 500 and 900. Prefer these loaded weights for new typography. Some existing controls and dates request other weights; those are current local styles, not additional bundled font faces.

### Global size tokens

Pixel equivalents below assume a 16px root size. Do not force a root pixel size just to preserve these equivalents.

| Token              | Size       | Approximate pixels |
| ------------------ | ---------- | ------------------ |
| `--text-heading-1` | `3rem`     | 48                 |
| `--text-heading-2` | `2.25rem`  | 36                 |
| `--text-heading-3` | `1.875rem` | 30                 |
| `--text-heading-4` | `1.5rem`   | 24                 |
| `--text-heading-5` | `1.25rem`  | 20                 |
| `--text-heading-6` | `1.125rem` | 18                 |
| `--text-body`      | `1.125rem` | 18                 |
| `--text-ui`        | `1rem`     | 16                 |
| `--text-caption`   | `0.875rem` | 14                 |

Headings default to weight 600 and line-height 1.25. Paragraphs default to Noto Serif, weight 500, line-height 1.6. Use responsive `clamp()` sizes for large display text rather than applying the global heading scale indiscriminately.

### Homepage display sizes

| Element                      | Size                         | Additional styling                                                    |
| ---------------------------- | ---------------------------- | --------------------------------------------------------------------- |
| Hero BISZMUN wordmark        | `min(14vw, 9rem)`            | Weight 700; line-height 0.9; tracking `-0.06em`; no wrap              |
| Hero date                    | `clamp(1rem, 2.5vw, 3.5rem)` | Serif; line-height 1.15                                               |
| Theme heading                | `clamp(2rem, 5.5vw, 5.5rem)` | Weight 600; line-height 1.1; tracking `-0.04em`                       |
| About Us heading             | `clamp(2rem, 3.5vw, 4rem)`   | Line-height 1.05; tracking `-0.04em`; balanced wrap                   |
| About Us heading below 48rem | `clamp(2.5rem, 9vw, 4.5rem)` | Weight 900 requested; white text with black stroke for image contrast |
| Footer BISZMUN wordmark      | `clamp(1.75rem, 3vw, 3rem)`  | Weight 700; line-height 1.1; tracking `-0.04em`                       |
| Footer year                  | `clamp(1.25rem, 2vw, 2rem)`  | Own line; line-height 1.15                                            |

## Buttons and link buttons

Reuse `Button` from `app/components/ui/button.tsx` for prominent actions. A navigation action uses `asChild` with an anchor; an in-page action uses a button.

### Shape and sizing

- Fully rounded pill (`rounded-full`), centered inline-flex contents, transparent border.
- Geologica, `text-sm` (0.875rem), requested weight 500, no text underline.
- Default height 2.25rem / 36px and horizontal padding 1rem / 16px.
- Default icon size 1rem / 16px; text/icon gap 0.5rem / 8px.
- Pointer cursor and color transition. The shared button currently relies on Tailwind's default duration/easing; menu hover timing is specified separately below.
- Keyboard focus: 2px outline with 2px offset. Match the outline color to the surface, including white on the blue theme section.
- Disabled controls have 50% opacity and do not receive pointer interaction.

| Size prop | Height  | Horizontal padding             |
| --------- | ------- | ------------------------------ |
| `xs`      | 1.5rem  | 0.5rem; 0.75rem text and icons |
| `sm`      | 2rem    | 0.75rem                        |
| Default   | 2.25rem | 1rem                           |
| `lg`      | 2.5rem  | 1.5rem                         |

Icon-only sizes are 1.5rem, 2rem, 2.25rem and 2.5rem for `icon-xs`, `icon-sm`, `icon`, and `icon-lg`.

### Prominent action colors

| Context / example                      | Background   | Foreground   | Hover                       |
| -------------------------------------- | ------------ | ------------ | --------------------------- |
| Default / Chair Applications           | Primary blue | White        | Primary blue at 90% opacity |
| Blue theme surface / See theme details | White        | Primary blue | White at 90% opacity        |
| Light About Us surface / More About Us | Black        | White        | Black at 90% opacity        |

The component also exposes `outline`, `secondary`, `ghost`, `link` and `destructive` variants. These are available implementation options; the three treatments above are the established homepage calls to action.

```tsx
<Button asChild>
  <a href="/destination">Action label</a>
</Button>

<Button asChild className="mt-6 bg-white text-primary hover:bg-white/90 focus-visible:outline-white">
  <a href="/theme">See theme details</a>
</Button>

<Button asChild className="mt-6 bg-black text-white hover:bg-black/90 focus-visible:outline-black">
  <a href="/about">More About Us</a>
</Button>
```

Homepage section buttons sit 1.5rem below their supporting copy. Labels describe the destination or action; preserve the current wording when reusing an existing action.

## Navigation and ordinary links

Navigation links use inherited Geologica, no underline, and rectangular hover areas. Hover fills the clickable area with UN blue using `background-color 150ms ease`; footer links apply the same fill for keyboard focus. Keep foreground color inherited instead of changing it to the same blue as the hover background.

Desktop top-navigation text uses `clamp(0.75rem, 1.05vw, 1.125rem)`, line-height 1.5, and padding `0.5em 0.85em`. The sidebar uses the same row treatment with its own horizontal insets and a smaller minimum font size.

### External destinations

Use Lucide's `ExternalLink` icon, hidden from assistive technology with `aria-hidden="true"`. In navigation and footer links it is 1em square with a 0.35em gap and approximately `-0.125em` vertical alignment. Shared button icons remain 1rem square.

All My BISZMUN links point to `https://my.biszmun.org`, with `target="_blank"` and `rel="noopener noreferrer"`. Footer menus use `external: true` to add the icon and new-tab behavior. Blank footer destinations currently prevent navigation until their URLs are supplied.

### Homepage navigation behavior

- Home targets `#home`; Theme targets `#theme`; About Us targets `#about-us`.
- Hash navigation scrolls smoothly when reduced motion is not requested.
- Desktop begins with the white sidebar menu. The horizontal top-right navigation appears when the theme canvas fully reaches the viewport, using a 500ms ease-out opacity transition, and disappears on scrolling back above it.
- The top-right navigation has a transparent background. White and black text copies are clipped at the section boundaries so even part of a letter can change color across the transition.
- Below 64rem, the sidebar items are hidden and the top-right navigation stays visible above the theme section. It reserves the ribbon width plus breathing room on the left; its text uses `min(0.75rem, 4.2cqw)` and horizontal padding 0.65em.
- On reaching the footer, the top navigation fades out over 300ms, including on small screens. It is inert and hidden from assistive technology when unavailable.

## Footer layout and menus

The footer is primary blue with white text and a minimum height of `100dvh`. Its padding is `clamp(1rem, 2vw, 3rem)`. Content can extend its height; it is part of normal page scrolling.

### Brand stack

Center these elements vertically in a column at the top of the footer:

1. White UN emblem, using `/logo_un.svg` as a `currentColor` mask; width `clamp(8rem, 12vw, 14rem)`.
2. BISZMUN wordmark, with BISZ white and MUN in UN blue; 0.5rem top margin.
3. 2027 on its own line; 0.25rem top margin.

The previous four-corner layout is retired. Keep the current brand stack when adding footer content.

### Three-column menu area

- Start the menu row 3rem below the brand stack.
- Desktop uses a centered grid, `width: max-content`, three equal `1fr` columns, and a 3vw column gap.
- The shared column width is the smallest intrinsic width that accommodates the widest menu content, including the longest link and its hover padding. Desktop links remain on one line.
- Columns share the height of the tallest menu; do not hardcode menu heights.
- Below 64rem, the row spans the full viewport width, with three equal `minmax(0, 1fr)` columns. Links wrap normally; bypass the desktop no-wrap sizing.
- Every new menu should use `FooterMenu` so titles, underlines, link padding and external icons remain consistent.

### Menu title and underline

| Property              | Convention                                                                  |
| --------------------- | --------------------------------------------------------------------------- |
| Font                  | Noto Serif, weight 500                                                      |
| Color                 | White                                                                       |
| Size                  | `clamp(1.125rem, 1.5vw, 1.5rem)`                                            |
| Line-height           | 1.25                                                                        |
| Underline             | Solid 3px bottom border in `--color-un`                                     |
| Underline length      | Matches the title box (`width: fit-content`), not the whole column          |
| Space above underline | 0.35em bottom padding                                                       |
| Space after title     | 0.75rem bottom margin                                                       |
| Left alignment        | Offset by the exact link horizontal padding, so heading and link text align |

Do not use a generic text-decoration underline or a full-column separator in place of this title treatment.

### Footer links

Use Geologica, `clamp(0.75rem, 1.05vw, 1.125rem)`, line-height 1.5. Each link is block-level with vertical padding 0.5em and horizontal padding 0.85 times its font size. The whole link area gets the rectangular UN-blue hover fill, with a pointer cursor and 150ms ease transition.

The shared styles derive title indentation and link padding from the same custom properties:

```css
--link-font-size: clamp(0.75rem, 1.05vw, 1.125rem);
--link-inline-padding: calc(var(--link-font-size) * 0.85);
```

```tsx
<FooterMenu
  title="Resources"
  links={[
    { label: "Participant Handbook", href: "" },
    { label: "My BISZMUN", href: "https://my.biszmun.org", external: true },
  ]}
/>
```

### Copyright area

Place copyright text below the menus, spanning all three columns with a 1.5rem row gap. Align its text with the padded menu text. Use white Noto Serif, weight 500, `clamp(0.75rem, 0.8vw, 0.875rem)`, and line-height 1.6. Separate paragraphs by 0.5em.

Its inline-size containment prevents long copyright text from increasing the intrinsic widths of the menu columns. Treat sample copyright copy as editable content, not a universal legal statement.

## Homepage composition and responsive layout

| Area     | Desktop                                                                                                          | Smaller screens                                                                                                                     |
| -------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Hero     | Full viewport; grid columns 8.5%, 15%, remaining width; blue ribbon in middle column                             | Preserve ribbon geometry; horizontal navigation replaces sidebar items below 64rem                                                  |
| Theme    | Full-viewport primary-blue canvas; centered heading, serif description, white pill action; subtle outline emblem | Fluid heading and padding; maintain centered composition                                                                            |
| About Us | White surface; text/image grid ratio 1:2; padding `5dvh 5vw`; copy max-width 28rem                               | Below 64rem, centered copy overlays collage; below 48rem, full-section two-column collage with white heading and contrast treatment |
| Footer   | Full-viewport minimum height; centered brand and intrinsically sized menus                                       | Full-width three-column row with wrapping links                                                                                     |

The registration section sits between About Us and the footer. It has a `100dvh` minimum height, a plain primary-50 surface and primary-950 text. Center a caption-sized uppercase label, a responsive Geologica heading (`clamp(2.5rem, 5.5vw, 5.5rem)`), serif copy (36rem maximum width), and a primary pill linking to `/registration`. Registration copy should not imply applications are open unless confirmed by event content.

The About Us mobile description is 1rem with line-height 1.5 and primary-blue text. Its photo mosaic uses six visible tiles; desktop includes nine. Unfilled image tiles use pale primary shades. The About Us text scrolls normally; the parallax experiment was reverted.

The theme description has a 36rem maximum width. The announcement is right-aligned, with a serif date and body, a Geologica title, and the primary pill action. The scroll cue uses caption-sized Geologica with a downward Lucide arrow.

## Motion, viewport and layering

The blue committees overview is followed by five white committee detail sections: GA, HRC, ECOSOC, DISEC, and Security Council. `CommitteeSections` gives each a 250dvh scene and a sticky stage with a 100dvh minimum height. Content uses a small primary-blue full-name label, a centered black Geologica heading, and a brief serif description. Descriptions can wrap on small screens. Reduced motion removes the extended hold and sticky positioning.

After registration, a primary-blue committees overlay reuses the theme canvas layout and scroll behavior: a 250dvh scene, sticky 100dvh stage, one viewport of linear slide travel, and a half-viewport hold after the entrance. It includes a centered Geologica heading and serif description. The navigation's white text clipping also follows this blue panel. With reduced motion, registration and committees become consecutive normal-flow sections.

| Interaction                       | Current treatment                                                                            |
| --------------------------------- | -------------------------------------------------------------------------------------------- |
| Menu hover background             | 150ms ease                                                                                   |
| Desktop top-navigation appearance | 500ms ease-out opacity                                                                       |
| Navigation hiding at footer       | 300ms ease-out opacity                                                                       |
| Loading overlay exit              | 300ms ease-out opacity                                                                       |
| Theme canvas entrance             | Linear scroll-linked vertical slide, one viewport of travel                                  |
| Collage reveal                    | Staggered opacity/depth animation; desktop waits for collage bottom, mobile reveals on entry |

Respect `prefers-reduced-motion`: section motion and smooth scrolling are disabled or bypassed, the collage remains visible, and navigation/loading fade transitions are removed. Hover color transitions currently remain enabled.

Use `dvh` for full-height viewport sections and the existing mobile `svh` exception for About Us. Layout viewport settings enable `viewport-fit: cover`. Keep important fixed navigation below `env(safe-area-inset-top)` and clear of the right safe area. Safari's root background and theme-color are synchronized with the visible section; preserve that behavior when extending the page.

The loading overlay is fixed at the page root above all page content, with z-index 1000. The top navigation uses z-index 20. Do not nest the loader inside the sticky hero, transformed canvas, or an isolated section: doing so can trap it beneath later content on hash-link reloads.

## Extending the design

- Reuse `Button`, `FooterMenu`, and the logo components instead of duplicating their markup and spacing.
- Use anchors for destinations and buttons for actions. Preserve keyboard focus treatment.
- Use the serif variable for editorial/supporting copy; inherit Geologica for controls.
- Keep UN-blue accents consistent across wordmarks, title rules, and menu hover surfaces.
- Preserve transparent top-navigation backgrounds and the existing boundary clipping when changing section layout.
- Allow content-driven height. Check wrapping at both 64rem and 48rem breakpoints and near the 320px minimum body width.
- Keep decorative globe/emblem imagery noninteractive, with appropriate accessible labels on meaningful logos and hidden decorative icons.
- Keep presentation separate from content sources such as `EVENTS.yml` and `app/content/section-3.json`; changing styling should not change event copy or image destinations.

The footer Appearance select offers System, Light, and Dark using a shadcn-style Radix Select. `next-themes` stores the choice and resolves System to the OS preference via the root `data-theme` attribute. The homepage remains forced light; other pages and dark Tailwind variants follow the resolved theme.
