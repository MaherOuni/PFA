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
| `src/assets/mock/*.json` | Fixture data used when `DEMO_MODE=true` |

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

Set `DEMO_MODE=true` in Vercel -> Settings -> Environment Variables to deploy a
working demo with no backend at all. In that mode:

- the login screen is skipped (`/` redirects straight to the dashboard) and the
  admin layout accepts a placeholder token instead of bouncing to `/login`;
- `AuthenticationService.authenticate()` accepts any credentials, so `/login`
  still works if you navigate to it;
- `ClientsService` and `UsersService` read `src/assets/mock/*.json` instead of
  calling the backend.

None of the real authentication code is removed - every branch above is guarded
by `environment.demoMode`, so clearing the variable restores normal behaviour.

Angular bakes environment files in at build time, so the variable is read during
the build by `scripts/set-env.js`, which regenerates
`src/environments/environment.prod.ts`. It runs automatically as the
`prebuild:prod` npm hook - no change to the build command is needed. The same
script also reads `API_URL`, which is the easiest way to point a real
deployment at a backend without editing code.

With neither variable set the generated file is identical to the one committed,
so local builds leave the working tree clean.

### Adding more mock data

Only two pages fetch over HTTP: **Clients** and **Personnels**. Every other page
(products, categories, sales, deposits, providers, POS) already renders
hardcoded arrays inside its component, so it works with or without a backend.
To extend the demo data, edit `src/assets/mock/clients.json` or
`src/assets/mock/users.json`.

Note that `stuff.component.ts` fetches users but still renders its own
hardcoded `Stuffs` array - the fetched JSON is only logged. That is pre-existing
behaviour, left as-is; wire `Stuffs` to the response if you want the mock file
to drive that table.

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
