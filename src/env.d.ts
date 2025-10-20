/// <reference path="../.astro/types.d.ts" />

declare global {
  function gtag(
    command: 'config' | 'event',
    targetId: string,
    params?: Record<string, any>,
  ): void
}

export {}
