/// <reference types="astro/client" />

import type { User } from '@supabase/supabase-js'

declare global {
  // ✅ Put App namespace inside declare global
  namespace App {
    interface Locals {
      user: User | null
    }
  }

  // (optional) keep your gtag here if you use it
  function gtag(
    command: 'config' | 'event',
    targetId: string,
    params?: Record<string, any>,
  ): void
}

export {}
