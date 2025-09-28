import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import vercelServerless from '@astrojs/vercel/serverless'
import svelte from '@astrojs/svelte'
import sitemap from '@astrojs/sitemap'
import partytown from '@astrojs/partytown'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.tinytidestherapy.com/',
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
  output: 'server',
  adapter: vercelServerless(),
})
