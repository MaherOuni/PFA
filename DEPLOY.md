# Deploying to Vercel

This project is an Angular 11 single-page app. Vercel builds it as a static site
and serves the contents of `dist/`.

## What is already configured

| File | Purpose |
| --- | --- |
| `vercel.json` | Install/build commands, output directory, SPA fallback, cache headers |
| `.npmrc` | `legacy-peer-deps=true` — required, see "Dependency conflict" below |
| `package.json` | `build:prod` script + `engines.node` pinned to `20.x` |
| `src/environments/environment*.ts` | `apiUrl` and `demoMode` used by the HTTP services |
| `scripts/set-env.js` | Generates `environment.prod.ts` from `DEMO_MODE` / `API_URL` at build time |
| `src/app/demo/` | Demo mode: the seed catalogue, the store the pages read, and the mode toggle |

## Deploy

1. Push this branch to GitHub (the repo is already `MaherOuni/PFA`).
2. On <https://vercel.com/new>, import the repository.
3. Leave the framework preset as detected — `vercel.json` overrides the build
   settings anyway. Do **not** override the install or build command in the
   dashboard, or `vercel.json` will be ignored for that field.
4. Deploy.

Or from the CLI:

```bash
npm i -g vercel
vercel        # preview deployment
vercel --prod # production deployment
```

## Demo mode (no backend)

Demo mode runs the whole app with no backend at all: authentication is bypassed
and every page reads from a seeded catalogue held in the browser. There are
three ways in, checked in this order.

| How | When to use it | Can the visitor leave? |
| --- | --- | --- |
| `DEMO_MODE=true` at build time | A permanently-demo deployment | No — the UI hides the exit |
| `#/dashboard?demo=1` in the URL | A link you send someone | Yes |
| **Explorer la demo** on the login screen | A visitor who lands on the real app | Yes |

The last two persist the choice in `localStorage`, so a reload stays in the
demo. A deployment pointed at a real backend therefore stays out of demo mode
unless someone explicitly asks for it.

Put `demo=1` after the `#`, not before it. Angular routes with `useHash`, and
its first navigation rewrites the address to a hash-only URL — anything in the
query string before the `#` is dropped. `DemoService` reads the URL at module
load to catch that form anyway, but only the hash form survives to be shared on
from inside the app.

### What demo mode changes

- `AuthenticationService.authenticate()` accepts any credentials and returns a
  placeholder token, and the admin layout accepts that token instead of
  bouncing to `/login`.
- `AuthInterceptorService` stops attaching an `Authorization` header, since
  there is nothing to authorise against.
- `DemoStoreService` writes the catalogue to `localStorage` after every change,
  so a product added on the Produits page is still there after a reload and is
  visible from the POS.
- A **Mode demo** badge appears in the top bar, with **Reinitialiser les
  donnees** (re-seed, discarding the visit's edits) and **Quitter la demo**
  (leave and return to the real login screen).

None of the real authentication code is removed — every branch above is guarded
by `DemoService.active`, so turning demo mode off restores normal behaviour.

### The demo data

Everything lives in `src/app/demo/`:

| File | Holds |
| --- | --- |
| `demo-seed.ts` | The seed catalogue: products, categories, clients, providers, deposits, staff, and a generated year of sales |
| `demo-store.service.ts` | The live collections the pages read and write, plus the figures the dashboard charts |
| `demo.service.ts` | Whether demo mode is on, and reset / exit |

Sales are generated rather than typed out, from a fixed seed: the dates stay
current without anyone editing them, and every visitor sees the same numbers.

To extend the demo, edit `demo-seed.ts`. Note that a product's `category` must
match an icon filename under `src/assets/img/icons/common/<Category>.png` — the
product table builds that path from the category string, so an accented
`Plâtrerie` would 404.

The list pages no longer carry their own hardcoded arrays; they all read
`DemoStoreService`. Outside demo mode that store stays in memory for the
session, which is how those pages behaved before — none of these entities has a
backend endpoint yet. Only **Clients** and **Personnel** fetch over HTTP, via
`ClientsService` and `UsersService`, and those two return the store's rows in
demo mode.

### Build-time configuration

Angular bakes environment files in at build time, so `DEMO_MODE` is read during
the build by `scripts/set-env.js`, which regenerates
`src/environments/environment.prod.ts`. It runs automatically as the
`prebuild:prod` npm hook — no change to the build command is needed. The same
script also reads `API_URL`, which is the easiest way to point a real
deployment at a backend without editing code.

With neither variable set the generated file is identical to the one committed,
so local builds leave the working tree clean.

## Connecting the backend (required outside demo mode)

Unless `DEMO_MODE` is set, the app calls a backend on `/api/...` and `/rest/...`. In development those are
forwarded to `http://localhost:8080` by `src/proxy.conf.json`. **That proxy does
not exist on Vercel** — Vercel only serves the static build — so the backend has
to be reachable another way. Until you do one of the following, the deployed app
loads but login and all data calls return 404.

### Option A — point the app at a public backend URL

Deploy the Spring backend somewhere public (Render, Railway, Fly.io, a VPS…),
then set its origin in `src/environments/environment.prod.ts`:

```ts
export const environment = {
  production: true,
  apiUrl: 'https://my-backend.example.com'
};
```

The backend must then allow CORS from the Vercel origin and be served over
**HTTPS** — a browser on an `https://` page will block plain `http://` calls.

### Option B — proxy through Vercel

Keep `apiUrl: ''` and let Vercel forward the two path prefixes. Add this to
`vercel.json`, **above** the existing catch-all rewrite (rewrites are matched in
order, so the `/(.*)` rule must stay last):

```json
"rewrites": [
  { "source": "/api/(.*)",  "destination": "https://my-backend.example.com/api/$1" },
  { "source": "/rest/(.*)", "destination": "https://my-backend.example.com/rest/$1" },
  { "source": "/(.*)", "destination": "/index.html" }
]
```

This keeps the browser on a single origin, so there is no CORS setup. Note that
`vercel.json` cannot read environment variables, so the backend URL is
hardcoded here.

## Notes on the build

### Dependency conflict

`@angular-devkit/build-angular@0.1001.4` is from the Angular 10 line while the
rest of the project is on Angular 11, so npm's peer resolution rejects the tree.
`.npmrc` sets `legacy-peer-deps=true` and `vercel.json` passes
`--legacy-peer-deps` explicitly. The long-term fix is to bump the devkit to the
Angular 11 line (`@angular-devkit/build-angular@~0.1102.0`), which has not been
done here to avoid changing build behaviour.

### OpenSSL / Node version

Angular 11 uses webpack 4, which hashes with MD4 via OpenSSL. On Node 17+ that
fails with `ERR_OSSL_EVP_UNSUPPORTED`, so the build command sets
`NODE_OPTIONS=--openssl-legacy-provider`. `engines.node` is pinned to `20.x`
(verified locally). If Vercel drops Node 20, change that field and re-verify —
the OpenSSL flag is still needed on 22.x.

### Routing

The router uses hash URLs (`useHash: true` in `src/app/app.routing.ts`), so
routes look like `/#/dashboard`. The catch-all rewrite to `/index.html` in
`vercel.json` is there so real paths also resolve if hash routing is ever turned
off. Static files are matched before rewrites, so assets are unaffected.

### Known issues carried over from the template

- `src/index.html` loads Google Maps with a literal `YOUR_API_KEY_HERE`. The
  maps page (`src/app/pages/maps`) will not render until a real key is added.
- The Chart.js and jQuery CDN tags in `index.html` are loaded at runtime from
  third-party CDNs; if those are unreachable the dashboard charts and the PDF
  receipt export break.
