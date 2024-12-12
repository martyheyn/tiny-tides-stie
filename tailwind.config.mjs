/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#f3ffff',
        secondary: '#9ddcdc',
        accent: '#f0f0f0',
        dark: '#1a1a1a',
        light: '#f0f0f0',
        error: '#ff0000',
      },
      fontFamily: {
        header: ['Square Peg', 'sans-serif'],
        body: ['Quicksand', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
