// `next` is attacker-visible (it's a query param on a URL that gets emailed
// and clicked), so reject anything that would turn `/${next}` into an
// off-site redirect: a leading `/` (-> protocol-relative `//host`) or a URL
// scheme (`javascript:`, `http:`, etc).
export function safeNextPath(raw: string | null): string {
  const next = raw ?? ''

  if (!next || next.startsWith('/') || next.startsWith('\\') || /^[a-z][a-z0-9+.-]*:/i.test(next)) {
    return '/'
  }

  return `/${next}`
}

// Sends the user back to where they started sign-in with a flag the sign-in
// form reads to explain why they're not logged in, instead of silently
// dropping them on the homepage.
export function withAuthError(path: string, reason: string): string {
  const url = new URL(path, 'http://placeholder')
  url.searchParams.set('auth_error', reason)
  return url.pathname + url.search
}
