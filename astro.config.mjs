import { defineConfig, envField } from 'astro/config'
import vercel from '@astrojs/vercel'
import sitemap from '@astrojs/sitemap'
import svelte from '@astrojs/svelte'
import partytown from '@astrojs/partytown'
import mdx from '@astrojs/mdx'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://www.tinytidestherapy.com/',
  output: 'server',
  adapter: vercel(),
  integrations: [
    svelte(),
    sitemap(),
    mdx(),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    // Astro's dev-server dependency scan crawls every .svelte/.astro file under
    // src/, including src/layouts/CourseLayout.svelte, which is WIP for an
    // unmerged branch and imports a component that doesn't exist yet on main.
    // Disabling discovery avoids crashing the scan; deps are optimized on
    // demand instead.
    optimizeDeps: {
      noDiscovery: true,
    },
  },
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    domains: ['dkbi9cj3nodif.cloudfront.net'],
  },
  env: {
    schema: {
      GOOGLE_MAPS_PLACES_API_KEY: envField.string({
        context: 'server',
        access: 'secret',
      }),
    },
  },
})
