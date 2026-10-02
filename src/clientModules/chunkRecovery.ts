/**
 * Recovers a tab that is holding HTML from a previous build.
 *
 * Every build renames the JS and CSS chunks, so an open tab (or a browser that
 * reused cached HTML) requests files the server no longer has: 404 while the
 * new build syncs, or 503 when the origin refuses the burst of requests for
 * names that are not in the CDN cache yet. Webpack reports this as a
 * ChunkLoadError and the route never renders. Reloading once fetches the
 * current HTML together with the chunk names that match it.
 */

const RELOAD_KEY = 'cslant:chunk-reload-at';
const COOLDOWN_MS = 60_000;

let reloadedThisPageView = false;

function isChunkFailure(reason: unknown): boolean {
  if (!reason) {
    return false;
  }
  const error = reason as Partial<Error>;
  const message = typeof error.message === 'string' ? error.message : String(reason);

  return (
    error.name === 'ChunkLoadError' ||
    /Loading (CSS )?chunk \S+ failed/i.test(message) ||
    /importing a module script failed/i.test(message) ||
    /error loading dynamically imported module/i.test(message)
  );
}

function reloadOnce(): void {
  if (reloadedThisPageView) {
    return;
  }
  reloadedThisPageView = true;

  try {
    const last = Number(window.sessionStorage.getItem(RELOAD_KEY)) || 0;
    if (Date.now() - last < COOLDOWN_MS) {
      return;
    }
    window.sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
  } catch {
    // Storage blocked (private mode): the in-memory flag above is the guard.
  }

  window.location.reload();
}

if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    if (isChunkFailure(event.error)) {
      reloadOnce();
    }
  });

  window.addEventListener('unhandledrejection', (event) => {
    if (isChunkFailure(event.reason)) {
      reloadOnce();
    }
  });
}

export {};
