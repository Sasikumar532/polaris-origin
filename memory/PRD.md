# PolarisOrigin — Marketing Site PRD

## Original Problem Statement
Design a premium, high-conversion website for "PolarisOrigin". Positioning: Premium Outbound GTM strategy and execution — "Hyper-personalized outbound that books meetings — you only pay for show-ups." Brand should feel enterprise-level, strategic, McKinsey/BCG meets modern SaaS. Strict visual rules: #1f3a5f navy primary, gold accent (sparing), white/very light cool gray backgrounds, NO gradients, NO neon/glow, sharp geometry, subtle 1px borders not shadows, line icons only.

## User Choices (verbatim)
- Multi-page site with an additional **Careers** page
- Primary CTA = "Book Free Consultation" → submits a Contact form (frontend only)
- Copy: agent writes
- No backend required (frontend-only)

## Architecture
- Frontend: CRA (React 19) + Tailwind + shadcn/ui, react-router-dom v7, lucide-react icons, sonner toasts
- Backend: untouched template FastAPI (not used for the site)
- Pages routed in `/app/frontend/src/App.js`: `/`, `/services`, `/case-studies`, `/about`, `/careers`, `/contact`, `*` (404)
- Global components: `components/site/SiteLayout.jsx`, `Navbar.jsx`, `Footer.jsx`, `Logo.jsx`, `SectionLabel.jsx`
- Fonts: Inter (body + headings) + Instrument Serif italic for editorial display accents
- Design tokens live in `src/index.css` (`--po-navy`, `--po-gold`, `--po-line`, etc.)

## What's Been Implemented (2025-12)
- Sticky enterprise navbar with POLARIS·ORIGIN lockup, mobile hamburger panel, persistent Book Free Consultation CTA
- Home: hero, marquee trusted-by strip, navy pay-per-show-up metrics block (4 metrics), 4 capability pillars, 3-step method, featured case teaser, editorial testimonial, final CTA
- Services: 4 detailed pillar cards with deliverables, 3 phase cards, 3 channel cards, CTA section
- Case Studies: 6 cards with industry filter, hover desaturate→color image effect, per-card "Discuss this case" link
- About: hero + image lockup, North Star narrative section (navy), 4 operating principles, 3 leadership cards (monogram-only avatars), testimonial, CTA
- Careers: 3 culture commitments, accordion of 4 open roles with responsibilities/requirements/apply CTA, "introduce yourself" CTA
- Contact: split layout with "What to expect" + qualification form (8 fields: name, email, company, role, revenue, intent, ICP, message), client-side validation, sonner toast errors, animated success state; offices grid below
- 404 page with editorial display headline
- Footer: dark navy with gold accents, 3-column sitemap, legal links
- Global motion: subtle fade-up reveal, hover color shifts, no transform scaling
- All interactive + key elements carry kebab-case `data-testid`

## Test Status
- Frontend E2E (testing_agent_v3 iteration_1): 51/51 assertions passed across desktop (1920×1080) and mobile (390×844)
- No backend; no integrations to test

## Backlog
### P1 (high-value next)
- Wire the Contact form to a real backend endpoint with email notification (Resend/SendGrid) so consultations are not lost on refresh
- Add a Calendly/Cal.com embed on the Contact page once a calendar is available
- Add per-case-study detail pages at `/case-studies/:slug` with full narrative + result chart

### P2 (polish & growth)
- Add a /resources or /writing section (Offer Doctrine excerpts) to establish editorial authority
- Replace placeholder client logos with real client wordmarks when consent is in place
- Add OG/Twitter share metadata + sitemap.xml + robots.txt for SEO
- Multi-language toggle (EN/DE/FR) for EMEA expansion

### P3 (operational)
- Dark mode for /careers and /case-studies reading pages
- Per-page analytics events on the persistent CTA
- A simple CMS hookup (Contentful/Sanity) so the partners can publish case studies without re-deploying

## Next Tasks
1. Decide whether the Contact form needs a real backend now or later (P1)
2. Provide real client logos / case study consent (P1)
3. Choose a calendar provider (Calendly / Cal.com) for embed (P1)
