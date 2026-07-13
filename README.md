# Polaris Origin — Website

Marketing website for **Polaris Origin**, an Outbound GTM and RevOps firm that
helps B2B service companies get qualified, ICP-matched sales calls on their
calendar — done-for-you, without retainers or setup fees.

Built with **Next.js 15 (App Router)**, **React 19**, and **Tailwind CSS**.

---

## Tech Stack

| Area        | Choice                                             |
| ----------- | -------------------------------------------------- |
| Framework   | [Next.js 15](https://nextjs.org/) (App Router)     |
| UI          | React 19, Tailwind CSS 3.4, `tailwindcss-animate`  |
| Icons       | [lucide-react](https://lucide.dev/)                |
| Booking     | [Cal.com](https://cal.com/) inline embed           |
| Analytics   | PostHog                                            |
| Fonts       | Inter (body), Instrument Serif (display accent)    |

## Getting Started

Requirements: **Node.js 18.18+** and npm.

```bash
cd frontend
npm install
npm run dev
```

The dev server runs at **http://localhost:3006**.

### Scripts

| Command         | Description                                  |
| --------------- | -------------------------------------------- |
| `npm run dev`   | Start the dev server on port 3006            |
| `npm run build` | Create a production build                    |
| `npm run start` | Serve the production build (run build first) |
| `npm run lint`  | Run ESLint (`eslint-config-next`)            |

> `npm run start` requires a prior `npm run build` — it serves the compiled
> `.next` output and will error if no build exists.

## Project Structure

```
frontend/
├── src/
│   ├── app/                     # App Router: routes, layout, metadata
│   │   ├── layout.js            # Root layout, <head>, Navbar/Footer, PostHog
│   │   ├── page.js              # Home route (/)
│   │   ├── about/page.js        # /about
│   │   ├── services/page.js     # /services
│   │   ├── contact/page.js      # /contact
│   │   ├── privacy-policy/…     # /privacy-policy
│   │   ├── terms-of-service/…   # /terms-of-service
│   │   ├── not-found.js         # 404
│   │   ├── icon.png             # Favicon
│   │   ├── opengraph-image.js   # Generated OG share card (1200×630)
│   │   └── twitter-image.js     # Re-exports the OG image
│   ├── views/                   # Page bodies (Home, About, Services, …)
│   ├── components/
│   │   ├── site/                # Navbar, Footer, CTASection, CalEmbed, …
│   │   └── ui/                  # Reusable primitives
│   └── globals.css              # Brand tokens, fonts, utilities
├── next.config.js
├── tailwind.config.js
└── jsconfig.json                # `@/*` → `src/*` path alias
```

Each route in `src/app/**/page.js` re-exports its view from `src/views` and
declares its own `metadata`.

## Brand

| Token       | Value     |
| ----------- | --------- |
| Navy        | `#1f3a5f` |
| Deep navy   | `#16294a` |
| Gold        | `#C9A14A` |
| Light grey  | `#f5f6f8` |

## Configuration

Environment variables (optional):

| Variable               | Default                      | Purpose                          |
| ---------------------- | ---------------------------- | -------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | `https://polarisorigin.com`  | Canonical URL for metadata / OG  |

## Deployment

```bash
cd frontend
npm ci
npm run build
npm run start   # or serve behind a process manager / reverse proxy
```

The app listens on port **3006**. Ensure the production host runs
`npm run build` before `npm run start`; deploying stale `node_modules` or a tree
without `src/app` will cause build errors.
