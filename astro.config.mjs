import { defineConfig, envField } from 'astro/config'
import vercel from '@astrojs/vercel'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import svelte from '@astrojs/svelte'
import partytown from '@astrojs/partytown'

export default defineConfig({
  site: 'https://www.tinytidestherapy.com/',
  output: 'server',
  adapter: vercel(),
  integrations: [
    tailwind(),
    svelte(),
    sitemap(),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
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
