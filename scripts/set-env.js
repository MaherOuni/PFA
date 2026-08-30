/**
 * Generates src/environments/environment.prod.ts from environment variables.
 *
 * Angular bakes its environment files in at build time, so runtime environment
 * variables are not visible to the browser bundle. This script runs as the
 * `prebuild:prod` npm hook, which means it runs automatically before
 * `npm run build:prod` both locally and on Vercel.
 *
 * Recognised variables (set these in Vercel -> Settings -> Environment Variables):
 *   DEMO_MODE  'true' to run without a backend: auth is bypassed and the
 *              services read from src/assets/mock/*.json. Default: false.
 *   API_URL    Origin of the backend, e.g. 'https://api.example.com'.
 *              Empty keeps requests relative. Default: ''.
 *
 * With neither variable set the generated file is byte-identical to the one
 * committed to git, so a plain local build leaves the working tree clean.
 */
const fs = require('fs');
const path = require('path');

const truthy = (value) => ['true', '1', 'yes', 'on'].includes(String(value).trim().toLowerCase());

const demoMode = truthy(process.env.DEMO_MODE);
// Trailing slashes would produce '//api/...' once joined with the request path.
const apiUrl = (process.env.API_URL || '').trim().replace(/\/+$/, '');

const target = path.join(__dirname, '..', 'src', 'environments', 'environment.prod.ts');

const contents = `// GENERATED FILE - do not edit by hand.
// Written by scripts/set-env.js on every 'npm run build:prod'.
// Change the DEMO_MODE / API_URL environment variables instead.
export const environment = {
  production: true,
  // When true the app runs with no backend: authentication is bypassed and the
  // services resolve to src/assets/mock/*.json instead of HTTP endpoints.
  demoMode: ${demoMode},
  // Base URL of the backend API. Empty keeps requests relative.
  apiUrl: '${apiUrl}'
};
`;

fs.writeFileSync(target, contents);
console.log(`[set-env] environment.prod.ts written (demoMode=${demoMode}, apiUrl='${apiUrl}')`);
