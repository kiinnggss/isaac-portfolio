/**
 * Resolves static asset paths accounting for GitHub Pages base path.
 * In development / local environment, returns the clean root path (e.g. `/resume.pdf`).
 * In production export with basePath (e.g. `/isaac-portfolio`), returns `/isaac-portfolio/resume.pdf`.
 */
export function getAssetPath(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  
  // 1. Check build-time injected environment variable
  const envBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (envBasePath) {
    const trimmed = envBasePath.endsWith("/") ? envBasePath.slice(0, -1) : envBasePath;
    return `${trimmed}${cleanPath}`;
  }

  // 2. Fallback to client-side detection if running under /isaac-portfolio
  if (typeof window !== "undefined" && window.location.pathname.startsWith("/isaac-portfolio")) {
    return `/isaac-portfolio${cleanPath}`;
  }

  return cleanPath;
}
