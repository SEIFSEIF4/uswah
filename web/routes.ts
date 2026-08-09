/**
 * Route registry. Paths here are LOCALE-LESS — the proxy strips /en or /ar before
 * matching, so one entry covers both languages.
 */

/**
 * An array of routes that are public:
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = ['/', '/search']

/**
 * An array of routes that are used for authentication:
 * The routes will be used to check if the user is authenticated
 * @type {string[]}
 */
export const authRoutes: string[] = ['/login']

/**
 * An array of routes that are used for protectedRoutes:
 * These routes will be hidden till the user is authenticated.
 * Anything nested under one of these prefixes also matches via
 * isProtectedRoute(). Keep this list in sync with the pages that
 * read a signed-in user, so the proxy can short-circuit unauthed
 * visitors at the edge.
 * @type {string[]}
 */
export const protectedRoutes: string[] = ['/saved']

/**
 * The default login route (locale is prefixed at redirect time)
 * @type {string}
 */
export const DEFAULT_LOGIN_ROUTE: string = '/login'

/**
 * The default redirect route after a successful login
 * @type {string}
 */
export const DEFAULT_REDIRECT_ROUTE: string = '/saved'

/**
 * Recovery paths: authed routes that live under an auth prefix but must NOT
 * bounce already-authed users (email confirmation callbacks, password reset).
 * Empty today — v1 has no onboarding — but the branch in proxy.ts reads it, so
 * adding one here is the only change needed.
 * @type {string[]}
 */
export const recoveryRoutes: string[] = []

// --------- helpers --------------------------------------------------------

const matches = (routes: string[], pathname: string): boolean =>
  routes.some((route) => pathname === route || pathname.startsWith(`${route}/`))

/**
 * Returns true if `pathname` exactly matches or is nested under any entry in
 * the `protectedRoutes` array. Used by proxy.ts to redirect unauthed visitors
 * and by the pages themselves as defense-in-depth.
 */
export function isProtectedRoute(pathname: string): boolean {
  return matches(protectedRoutes, pathname)
}

/**
 * Returns true if `pathname` is the dedicated login (or any future auth)
 * route. Used by proxy.ts to redirect already-authed visitors away.
 */
export function isAuthRoute(pathname: string): boolean {
  return matches(authRoutes, pathname)
}

/**
 * Returns true if `pathname` is a recovery path (authed-only but exempt from
 * the "already-authed-go-away" auth-route check). See `recoveryRoutes`.
 */
export function isRecoveryRoute(pathname: string): boolean {
  return matches(recoveryRoutes, pathname)
}

/**
 * Returns true if `pathname` is in the public allowlist. Situation pages are
 * public too but are dynamic slugs, so they are not listed; the proxy only acts
 * on protected and auth routes.
 */
export function isPublicRoute(pathname: string): boolean {
  return matches(publicRoutes, pathname)
}

/**
 * Validate a `?redirect=` target before redirecting to it after a successful
 * login. Blocks open-redirect attacks like `?redirect=//evil.com` or
 * `?redirect=https://evil.com` by requiring a single-slash internal path.
 */
export function safeInternalRedirect(
  target: string | null | undefined,
  fallback: string = DEFAULT_REDIRECT_ROUTE
): string {
  if (!target) return fallback
  if (!target.startsWith('/') || target.startsWith('//')) return fallback
  return target
}
