/**
 * Prefix a `public/` asset path with the app base URL so it still resolves
 * when the site is served from a subpath (e.g. GitHub Pages project sites,
 * where everything lives under /<repo-name>/).
 */
export function publicAsset(path: string): string {
  const base = useRuntimeConfig().app.baseURL
  return base.replace(/\/$/, '') + path
}
