export const environment = {
  production: true,
  // Base URL of the backend API.
  // Empty means requests stay relative ('/api/...', '/rest/...'), which only
  // works if something in front of the app forwards them to the backend
  // (see the `rewrites` example in DEPLOY.md).
  // Otherwise set the full origin of the deployed backend,
  // e.g. 'https://my-backend.example.com'.
  apiUrl: ''
};
