// GENERATED FILE - do not edit by hand.
// Written by scripts/set-env.js on every 'npm run build:prod'.
// Change the DEMO_MODE / API_URL environment variables instead.
export const environment = {
  production: true,
  // Forces demo mode on: the app runs with no backend, authentication is
  // bypassed and every page reads the seeded catalogue in src/app/demo.
  // Demo mode can also be switched on at runtime (a ?demo=1 link, or the
  // button on the login screen); this flag makes it permanent and hides the
  // exit. See DEPLOY.md.
  demoMode: false,
  // Base URL of the backend API. Empty keeps requests relative.
  apiUrl: ''
};
