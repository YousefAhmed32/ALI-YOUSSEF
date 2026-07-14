# Ali Youssef Portfolio — Independent Engineering Audit

**Type:** Senior software engineering / commercial-quotation audit
**Scope:** `/client` (React SPA) — reviewed as a build-for-sale deliverable, not a demo
**Repo state:** 2 commits, `main` branch
**Reviewed:** 2026-07-12
**Method:** Full static source read (components, hooks, data, styles, build config, build output) — no runtime profiling (e.g. Lighthouse) was performed

---

## Table of Contents

1. [General](#1-general)
2. [Tech Stack](#2-tech-stack)
3. [Design Quality](#3-design-quality)
4. [Sections](#4-sections)
5. [Features](#5-features)
6. [Animations](#6-animations)
7. [Performance](#7-performance)
8. [SEO](#8-seo)
9. [Code Quality](#9-code-quality)
10. [Backend](#10-backend)
11. [Business Value](#11-business-value)
12. [Time Estimation](#12-time-estimation)
13. [Pricing](#13-pricing)
14. [Final Report](#14-final-report)

---

## 1. General

A single-page-feel, multi-route React application for a fictionalised interior/architectural design practice ("Ali Youssef," based in Lebanon). The home route stacks fifteen full-bleed cinematic sections; secondary routes cover a work index, per-project detail, a studio page, and a contact page that is really a WhatsApp deep link.

| Attribute | Assessment |
|---|---|
| **Project type** | Marketing / portfolio site for a solo creative practice — no product, no transactional surface. |
| **Target audience** | Prospective high-end residential / boutique-commercial clients, arriving to be sold on taste and craft before they ever call. |
| **Overall quality** | 7/10 in isolation for craft; **64/100** overall once completeness, infrastructure, and delivery discipline are weighed in (see §14). |
| **Estimated development level** | **Senior** on animation/interaction engineering (custom pointer-gesture lightbox, GSAP timeline choreography, accessible focus-trapped modals). **Unfinished / junior-adjacent** on delivery discipline — placeholder copy shipped to production paths, zero tests, no SEO wiring, dead dependencies left in. |
| **Template-based or custom-built?** | Custom-built component system on top of an **untouched** default `create-vite` React scaffold (the shipped README is still the generic Vite template text). The visual system and section choreography are bespoke, not a purchased kit. |
| **Complexity level** | High on the frontend/motion axis, near-zero on the systems axis — no backend, no real data layer beyond static JS objects, no auth, no persistence. |

> **FLAG:** Every one of the nine catalogued projects still carries `location: TO BE CONFIRMED`, the studio `email` is `TO BE SUPPLIED`, the city is `TO BE SUPPLIED`, and Instagram is an empty string. The code handles these gracefully (an `isUnset()` helper hides the field rather than printing the raw placeholder) — a genuinely careful pattern — but it does not change the fact that the site, as committed, is not finished content-wise.

---

## 2. Tech Stack

| Category | Technology | Note |
|---|---|---|
| Framework | React 19.2.7 | Function components + hooks only, no class components. |
| Routing | React Router 7.18 (BrowserRouter) | Route-level code splitting via `lazy()` + `Suspense`. |
| Build tool | Vite 8.1.1 + `@vitejs/plugin-react` 6 | Rolldown-based Vite variant present in the lockfile. |
| Linter | oxlint 1.71 | Rust-based, fast — but the config enables only 2 rules. Minimal guardrails. |
| Animation A | GSAP 3.15 + `@gsap/react` | Scroll/entrance timeline choreography. |
| Animation B | Framer Motion 12.42 | Route transitions, modal enter/exit, stagger lists. **Ships alongside GSAP on every route** — see §7. |
| State management | None | Local component state + two hand-rolled pub/sub stores (`lightboxStore.js`, `cursorStore.js`). |
| Forms | None | The "contact form" is a `wa.me` deep link and an optional Instagram anchor. No input, no validation, no submission handler exists anywhere in the repo. |
| SEO tooling | None | Hand-written static tags in one `index.html`; no per-route head management. |
| Fonts | Google Fonts (CDN, render-blocking) | Cormorant Garamond, Archivo, IBM Plex Mono. Preconnect used; not self-hosted or subset. |
| Icons | Hand-built SVG sprite + custom `LogoMark` | No icon-library dependency. |
| Image tooling | `sharp` + custom `generate-icons.mjs` | Used only to derive favicons from a source mark — never applied to content photography. |
| Testing | Playwright 1.61 (installed) | **Zero spec files exist.** Dead dependency, 0% coverage. |
| TypeScript | `@types/react`, `@types/react-dom` (installed) | No `tsconfig.json`; project is 100% `.jsx`. Vestigial scaffold leftovers. |
| Deployment | Static `dist/` (Vite build) | No `vercel.json` / `netlify.toml` / Dockerfile / CI workflow committed. |
| CDN / Hosting | Unconfirmed | Images serve from the same static origin; no image CDN in evidence. |

> **NOTE:** Two full animation libraries (GSAP + Framer Motion) are both bundled into the main chunk. Nearly everything Framer Motion is doing here — opacity/transform fades, staggered lists, exit transitions — GSAP can do natively. Shipping both is the single easiest line-item to cut for bundle size.

---

## 3. Design Quality

### UI Quality — 8/10
A genuinely confident editorial system: a 3-typeface stack (Cormorant Garamond serif display, Archivo sans, IBM Plex Mono for labels/data), a warm ivory/near-black/bronze palette, and a recurring "SCENE 0X" / mono-metadata vocabulary that gives the whole site a consistent, considered voice. Not a template look.

### UX Quality — 6/10
Beautiful to move through, but the heavy scroll-linked cinematic sections trend toward scroll-hijack-adjacent territory, and a site whose entire "let's talk" path is a single WhatsApp button is a real conversion-funnel gap for a business that presumably also gets email/phone enquiries.

| Dimension | Assessment |
|---|---|
| Visual hierarchy | Strong — eyebrow label → serif headline → mono metadata is applied with discipline across every section. |
| Spacing system | Tokenised 4px scale (`--space-1`…`--space-16`) plus a fluid `--gutter: clamp()` for page margins — a real system, not eyeballed values. |
| Typography | Display serif / UI sans / mono-data three-role system, consistently applied via a `.type-mono` utility class. |
| Color system | Ivory/black/ink/bronze token set. Notably, the codebase ships a dedicated `--bronze-ink` variant specifically because raw `--bronze` on ivory only hits ~4.1:1 contrast — **a deliberate AA-contrast fix, documented in a comment.** That level of care is rare and worth crediting. |
| Consistency | High — recurring vocabulary (scene labels, index numbers, mono metadata) reused across every route. |
| Accessibility | Above average for this class of site: `sr-only` text, `aria-label`/`aria-modal` on dialogs, real focus traps with Escape + return-focus in both the lightbox and the fullscreen menu, and a `useReducedMotion` hook wired into essentially every animated component. No skip-link found; no visible language-alternate handling. |
| Responsive design | Adaptive via `useMediaQuery` — desktop-only effects (custom cursor, magnetic pull) are gated off fine-pointer/wide-viewport devices rather than just hidden with CSS. |
| Loading experience | No dedicated loading screen or progress bar exists anywhere in the component tree. Route changes get a 0.6s clip-path/opacity fade (Framer Motion) — that's the entire "loading" experience. |
| Micro-interactions | Magnetic link pull, custom cursor follower, hover-swapped project preview in the fullscreen index, auto-hiding/compressing header. |
| Animation quality | High craft — see §6. |
| Premium feeling | Yes, visually — the aesthetic reads high-end. Undercut in practice by the unresolved placeholder content a real visitor would encounter. |
| Originality | Genuinely bespoke section concepts (cinematic "chapter" scroll pans, letter-magnet hero) rather than a recognisable agency-template pattern. |

---

## 4. Sections

Fifteen sections compose the home route; five routes exist in total. Time estimates assume one senior React/motion developer.

| Section | Purpose | Complexity | Difficulty | Est. time |
|---|---|---|---|---|
| HeroExperience | Arrival scene — clip-path media wipe + letter-by-letter title reveal, magnetic title. | High | High | 10–12h |
| VeiledStoneChapter | Pinned horizontal scroll through Project 001's five "chapters." | High | High | 10–14h |
| ApertureHouseChapter | Same cinematic-chapter pattern for Project 002. | High | High | 8–10h (pattern reused) |
| FullRevealMoment | Single full-bleed image that scales slowly on scroll (Project 003). | Medium | Medium | 5–7h |
| NightWorksSequence | Full-elevation reveal for the commercial "Strata" project. | Medium | Medium | 5–7h |
| ManifestoSection | Typographic manifesto — indent/emphasis-driven line reveal from `site.js` data. | Medium | Medium | 4–6h |
| TypologiesSection | Groups the catalogue by typology (residential / commercial / interior / spatial study). | Medium | Low-Med | 5–7h |
| FacetKitchenSection | Interior detail chapters (stone, leather, brass, glass) for Project 009. | High | High | 8–10h |
| MaterialGallerySection | Cross-project material strip (7 curated crops across the catalogue). | Medium | Medium | 6–8h |
| ObjectStudies | Secondary object/furniture photography grid. | Low-Med | Low | 4–6h |
| SelectedInteriors | Curated interior photography set (console/wardrobe/lounge imagery). | Medium | Medium | 6–8h |
| CraftsmanshipSection | Materials & craftsmanship editorial block. | Medium | Low-Med | 5–7h |
| ArchiveList | Reusable project index list — powers both the home teaser and the full Work Index route. | Medium | Medium | 7–9h |
| StudioTeaser | Teaser card linking to the Studio page. | Low | Low | 3–4h |
| ClosingSection | Closing manifesto lines, mirrors the hero's typographic treatment. | Low-Med | Low | 3–4h |
| Work Index / Project / Studio / Contact / 404 (pages) | Route shells composing the sections above, plus adjacent-project navigation on the detail page. | Low-Med | Low | 16–20h combined |

---

## 5. Features

### Present & working

- Fullscreen overlay navigation with live hover-preview of each project
- Custom animated cursor (desktop / fine-pointer only, gated correctly)
- Magnetic hover links on nav and CTAs
- GSAP scroll/entrance timeline choreography, letter-splitting
- Framer Motion route transitions + modal enter/exit
- Hand-rolled pinch-zoom / pan / swipe lightbox (Pointer Events, no gesture library)
- Pinned horizontal "chapter" galleries
- Sitewide `prefers-reduced-motion` adaptation
- Auto-hiding, scroll-compressing site header
- Per-section nav theme switching (light/dark header per scene)
- WhatsApp deep-link CTA
- Work index + per-project detail routing, adjacent-project nav
- Native `loading="lazy"` + `decoding="async"` on below-fold imagery
- Favicon/touch-icon generation pipeline (sharp script)
- Accessible modal pattern: focus trap, Escape, return-focus (lightbox + menu)
- Custom 404 page

### Absent — do not assume otherwise

- Real contact form / email backend
- Dark-mode toggle for the user (theming is per-section, not user-controlled)
- CMS or admin dashboard of any kind
- Search or filter UI on the Work Index (all 9 projects render statically, unfiltered)
- Blog / CMS-driven content
- Localization / i18n
- Analytics of any kind (no GA/Plausible/Meta Pixel snippet)
- Cookie / consent banner
- Sitemap.xml / robots.txt
- Loading screen or progress bar
- Authentication
- Counters, sliders, maps, or video embeds
- Automated tests of any kind

---

## 6. Animations

| Animation | Trigger | Library | Difficulty | Perf. impact | Est. time |
|---|---|---|---|---|---|
| Hero letter reveal + media clip-path wipe | Mount | GSAP | High | Medium | 10–12h |
| Magnetic cursor pull on links/title | Pointer move (desktop only) | Custom hook | Med-High | Low-Med | 6–8h |
| Custom cursor follower | Pointer move | Custom (store + component) | Medium | Low | 4–6h |
| Pinned horizontal chapter pans | Scroll position | GSAP | High | Med-High | 10–14h / variant |
| Split-text line reveal (headings) | Mount / in-view | Custom component | Medium | Low | 5–7h |
| Route transition (clip-path fade) | Route change | Framer Motion | Low-Med | Low | 3–4h |
| Fullscreen menu stagger-in + preview swap | Menu open / row hover | Framer Motion | Medium | Low | 5–6h |
| Lightbox pinch-zoom / pan / swipe | Pointer gestures, wheel, keyboard | Hand-rolled Pointer Events | High | Medium | 12–16h |
| Sticky header compress / auto-hide | Scroll | Custom listener | Low | Low | 2–3h |
| Image reveal mask on scroll-into-view | In-view (IntersectionObserver) | Custom component | Medium | Low-Med | 4–6h |

> **CREDIT:** The lightbox is the standout piece of engineering in the repo: real pointer-event pinch/drag/swipe math, origin-aware zoom, neighbour preloading, and it still respects `prefers-reduced-motion` and traps focus correctly. That is not template code.

---

## 7. Performance

**Sub-scores:** Code splitting — Good · Image optimization — Poor · Lazy loading — Partial · Bundle discipline — Fair · Font strategy — Weak

| Dimension | Assessment |
|---|---|
| Bundle size | Main JS chunk is **~393 KB** uncompressed (React + GSAP + Framer Motion + Router), with route chunks correctly split off for Work/Project/Studio/Contact/404 via `React.lazy`. |
| Images | Content photography runs **150 KB–668 KB per JPEG** across sixteen hero/gallery images, plus one **2.4 MB PNG**. No WebP/AVIF, no responsive `srcset`/`sizes`, no image CDN. This is the single biggest performance liability in the project. |
| Lazy loading | Native `loading="lazy"` + `decoding="async"` is applied consistently across six section files for below-fold imagery — a real, correctly-scoped optimization, not a token gesture. |
| Caching | Vite emits content-hashed filenames, which supports long-lived cache headers — but no hosting config is committed to confirm those headers are actually set anywhere. |
| Fonts | Three Google Fonts families loaded render-blocking via CDN `<link>` (mitigated only by `preconnect`). No self-hosting, no subsetting, no `font-display` override beyond Google's default. |
| LCP risk | The hero image (the page's Largest Contentful Paint element) is an unoptimized, non-responsive JPEG in the hundreds-of-KB range — directly at odds with `fetchPriority="high"` being set on it. |

**Performance score: 5/10** — solid architecture (code splitting, lazy images) undercut by unoptimized/uncompressed source photography and redundant animation dependencies.

---

## 8. SEO

| Dimension | Status | Detail |
|---|---|---|
| Meta tags | ✅ Present | Description + theme-color, hand-written into `index.html`. |
| Open Graph | ✅ Present | og:type/title/description/image at 1200×630. |
| Twitter Cards | ✅ Present | summary_large_image. |
| Per-route SEO | ❌ Absent | Every route — home, work index, each of the 9 project pages, studio, contact — serves the **identical** title/description/OG tags from the single static `index.html`. No `react-helmet-async` or equivalent is wired into the shipping React app. |
| Schema / JSON-LD | ❌ Absent | — |
| Robots.txt | ❌ Absent | — |
| Sitemap.xml | ❌ Absent | — |
| Semantic HTML | ✅ Good | `<header>`, `<nav aria-label>`, one `<h1>` per route, `<dl>` for contact facts. |
| Alt text | ✅ Mostly good | Descriptive alt on primary imagery in sampled sections; decorative images correctly use empty `alt=""`. |
| Performance → SEO | ⚠️ At risk | Uncompressed hero imagery + render-blocking fonts will directly hurt Core Web Vitals (LCP), which Google treats as a ranking input. |

**SEO readiness: 3/10** — enough to not embarrass an Open Graph preview card, not enough to rank against genuine competition.

> **FLAG:** Identical meta/OG across every route means a Google result for "Ali Youssef Veiled Stone House" and a share-link for the Contact page would both show the exact same title, description and preview image. For a business whose growth depends on being found, this is a disqualifying gap, not a nice-to-have.

---

## 9. Code Quality

| Dimension | Assessment |
|---|---|
| Architecture | Sensible domain-oriented split — `components/{brand,interaction,layout,media,navigation,sections,typography}`, `data/`, `hooks/`, `pages/`, `styles/`, `utils/`. Not a flat dump. |
| Folder structure | Consistent CSS-per-component colocation (`ComponentName.jsx` + `component-name.css`). |
| Scalability | Fine for a marketing site of this size; would need a real content layer (CMS or MDX) if the project catalogue were expected to grow past hand-authored objects. |
| Maintainability | Content is centralised in `data/*.js` (site, contact, projects, interiors) rather than hardcoded inline — components read from a single source of truth. Comments explain *why*, not what (e.g. the placeholder-handling rationale in `placeholder.js`). |
| Reusability | Shared hooks (`useGSAPContext`, `useReducedMotion`, `useMediaQuery`, `useSectionTheme`) are properly extracted; `ArchiveList` and the gallery components are reused across routes rather than duplicated. |
| Component quality | Functional components, hooks-only, no class components. |
| Naming conventions | Consistent PascalCase components, camelCase hooks/utilities, kebab-case CSS files. |
| Test coverage | **0%** — no spec files exist despite Playwright being a listed dependency. |
| Lint coverage | Minimal — only 2 rules enabled in `.oxlintrc.json`. |
| CI/CD | None — no `.github/workflows` or equivalent. |

**Clean code score: 7/10** — genuinely tidy for what exists; docked for zero test coverage, a linter config with only 2 rules enabled, vestigial TypeScript types with no TypeScript, a dead Playwright dependency, and non-project build-tool artifacts left committed at the repository root.

> **FLAG — Repository hygiene:** The repo root (outside `client/`) carries `support.js` (a generated "dc-runtime" script from an AI website-authoring tool), two multi-KB `*.dc.html` source files, and an `uploads/` folder of ad-hoc, inconsistently-named interior photos — none of it referenced by the shipping React app. A comment in `data/projects.js` confirms the React app's content was "transcribed" from one of those `.dc.html` files. Committing an authoring tool's scratch output into a client-facing repository is exactly what a paying client's own engineer would flag in a handover review — it should have been `.gitignore`'d or deleted before delivery.

> **NOTE:** `@types/react` and `@types/react-dom` are installed with no `tsconfig.json` and zero `.ts`/`.tsx` files anywhere — dead weight left from the scaffold, along with the untouched default Vite README.

> **CREDIT:** Where code exists, it is clean: no prop-drilling messes, no god-components, sensible custom hooks, and a documented, deliberate approach to unresolved content (`isUnset()`) rather than leaving raw placeholder strings on the page.

---

## 10. Backend

**No backend exists.** This is a 100% static, client-only React application. There is no server directory, no API routes, no database client, no ORM, and no environment-variable-driven configuration anywhere in the repository.

| Capability | Status |
|---|---|
| Authentication | None |
| Database | None |
| APIs | None — no `fetch`/`axios` call to any backend anywhere in the source |
| CMS | None |
| Admin dashboard | None |
| Storage | Static files served from `/public` |
| Email | None — no Formspree/EmailJS/Resend/etc. integration; the only "contact" path is a WhatsApp deep link |
| Analytics | None found |
| Security | N/A at this layer (no server surface). Frontend correctly uses `rel="noopener noreferrer"` on all `target="_blank"` links — good tab-nabbing hygiene. No secrets found committed. |
| Deployment | Static-only, deployable to any static host, but no config committed for any of them |

---

## 11. Business Value

**As a developer showcase:** High value. The motion engineering — the lightbox especially — is a legitimate portfolio-piece for whoever built it: it demonstrates senior-level command of GSAP, Framer Motion, Pointer Events, and accessibility-aware modal patterns.

**As "Ali Youssef's" live business site, today:** Not ready. Every project's location is a placeholder, there's no email, no verified Instagram, and the entire lead-capture mechanism is a single WhatsApp button. A visitor doing real due diligence on a residence-scale commission would notice within seconds.

A premium client's own web-savvy stakeholder would read the visual language as premium — the type system and photography direction earn that — but would flag the unfinished content and missing SEO/analytics infrastructure as launch-blocking in the same breath.

- **Best-fit buyer:** An individual creative professional or boutique studio (interior designer, architect, photographer) wanting a striking, animation-forward single portfolio, who will supply real content before go-live — or a freelancer/small agency using this as a reusable starting point for similar-niche clients.
- **Poor fit:** Corporate or enterprise clients, who need CMS-editable content, multi-author workflows, analytics, and a real lead-capture form — none of which exist here.

---

## 12. Time Estimation

| Phase | As-built | Remaining to shippable v1 |
|---|---|---|
| UI design / art direction | 24–32h | — |
| Frontend build (structure, routing, data layer, pages) | 80–95h | 6–10h (resolve placeholders) |
| Animation implementation (subset of above) | 45–60h | — |
| Backend | 0h | Scope separately if a real form/CMS is required |
| Testing | 0h | 16–24h |
| Optimization | ~4h | 12–18h (image compression, responsive images, font strategy, bundle trim) |
| SEO wiring | ~2h | 8–12h (per-route meta, sitemap, robots.txt, schema) |
| Deployment / CI | 0h | 4–6h |
| **Total** | **~165–210h (21–26 working days)** | **+55–75h (7–9 working days)** |

---

## 13. Pricing

Market value for a frontend-only, animation-forward custom portfolio at this scope (no backend, no CMS, testing/SEO/optimization not yet complete). Figures are for the project **as delivered**.

### Egypt (EGP)
| Tier | Price |
|---|---|
| Minimum | 15,000–25,000 |
| Professional average | 40,000–70,000 |
| Premium agency | 90,000–150,000 |
| Enterprise-bundled | 200,000+ |

### Saudi Arabia (SAR)
| Tier | Price |
|---|---|
| Minimum | 4,000–6,000 |
| Professional average | 10,000–18,000 |
| Premium agency | 25,000–40,000 |
| Enterprise-bundled | 60,000+ |

### UAE (AED)
| Tier | Price |
|---|---|
| Minimum | 4,000–7,000 |
| Professional average | 11,000–20,000 |
| Premium agency | 28,000–45,000 |
| Enterprise-bundled | 65,000+ |

### United States (USD)
| Tier | Price |
|---|---|
| Minimum | 1,200–2,000 |
| Professional average | 3,000–6,000 |
| Premium agency | 8,000–14,000 |
| Enterprise-bundled | 20,000+ |

### Europe (EUR)
| Tier | Price |
|---|---|
| Minimum | 1,100–1,800 |
| Professional average | 2,800–5,500 |
| Premium agency | 7,500–13,000 |
| Enterprise-bundled | 18,000+ |

*"Premium agency" and "Enterprise" tiers assume the buyer also commissions the missing work: real content, QA/tests, SEO wiring, image optimization, and a genuine contact/CMS backend — none of which are included in the project as it stands today.*

---

## 14. Final Report

### Scores

| Metric | Score |
|---|---|
| **Overall score** | **64 / 100** |
| Complexity | 6 / 10 |
| Design | 8 / 10 |
| Code | 6 / 10 |
| Performance | 5 / 10 |
| UX | 6 / 10 |
| Animation | 8.5 / 10 |
| Commercial value | 6 / 10 |

### Recommended selling price

**$2,800 – $4,500 USD** as delivered today (frontend-only, content incomplete) — rising to **$5,500–$9,000 USD** once content, SEO, tests, and image optimization are completed. (See §13 for full regional breakdown in EGP, SAR, AED, and EUR.)

### Why it deserves that price — not more, not less

This project earns a premium above a template purchase because the animation and interaction layer is genuinely hand-engineered: the GSAP hero choreography, the pinned cinematic chapter scrolls, and above all the custom pointer-based pinch/zoom/swipe lightbox represent real senior-level frontend work that a client cannot get from a page builder or a $50 template. The type system and color tokens show design discipline down to documented AA-contrast fixes — the kind of detail most freelance builds skip entirely.

It does not earn agency-premium pricing because it is not a finished deliverable. Every project's location is an unresolved placeholder, the studio has no working email, "Instagram" is a blank string, and the entire lead-capture mechanism is one WhatsApp button — for a business built on landing high-value residential commissions, that is a thin funnel. There is zero automated test coverage despite a testing library being installed and unused. There is no SEO wiring beyond a single static meta block shared by every route, which will actively suppress discoverability. Sixteen content images are shipped uncompressed at 150 KB–2.4 MB with no responsive variants, directly threatening the page's own Largest Contentful Paint. Two animation libraries are bundled where one would do. And the repository itself carries leftover authoring-tool artifacts (a generated `support.js`, raw `.dc.html` source files, an orphaned `uploads/` folder) that have no business being in a client handover.

In short: a strong, original front-of-house design and a genuinely impressive motion-engineering layer, sitting on top of a site that is not yet finished as a product. Price it as a talented developer's strong first pass, not as a studio's completed commercial launch.

---

*Ali Youssef Portfolio — Engineering Audit · Prepared 2026-07-12 · Static review, no runtime profiling performed*
