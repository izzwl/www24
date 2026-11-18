// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path';
import './scripts/patch-pinia.js';
export default defineNuxtConfig({
  server: {
    port: process.env.NUXT_SERVER_PORT,
    host: process.env.NUXT_SERVER_HOST,
  },
  devtools: { enabled: true },
  runtimeConfig: {
    dbHost: process.env.DB_HOST || '127.0.0.1',
    dbPort: Number(process.env.DB_PORT) || 3806,
    dbUser: process.env.DB_USER || 'root',
    dbPassword: process.env.DB_PASSWORD || 'root',
    dbName: process.env.DB_NAME || 'portalpy',
    sessionSecret: process.env.SESSION_SECRET || 'testest'
  },
  modules:[
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-primevue',
  ],
  app: {
    head: {
      title: 'PT Nusantara Turbin dan Propulsi - Aero Engine & Industrial Turbines MRO',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/static/favicon/favicon-32x32.png?v=2' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/static/favicon/favicon-16x16.png?v=2' },
        { rel: 'shortcut icon', href: '/favicon.ico?v=2' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/static/favicon/apple-touch-icon.png?v=2' }
      ]
    }
  },
  primevue: {
    options: { unstyled: true },
    importPT: { as: 'Lara', from: path.resolve(__dirname, './presets/lara/') },
    components: {
        exclude: ["Editor", "Chart"]
    }
  },
  tailwindcss: {
      config: {
          content: [
              "presets/**/*.{js,vue,ts}"
          ],
          theme: {
              extend: {
                  colors: {
                      "primary-50": "rgb(var(--primary-50))",
                      "primary-100": "rgb(var(--primary-100))",
                      "primary-200": "rgb(var(--primary-200))",
                      "primary-300": "rgb(var(--primary-300))",
                      "primary-400": "rgb(var(--primary-400))",
                      "primary-500": "rgb(var(--primary-500))",
                      "primary-600": "rgb(var(--primary-600))",
                      "primary-700": "rgb(var(--primary-700))",
                      "primary-800": "rgb(var(--primary-800))",
                      "primary-900": "rgb(var(--primary-900))",
                      "primary-950": "rgb(var(--primary-950))",
                      "surface-0": "rgb(var(--surface-0))",
                      "surface-50": "rgb(var(--surface-50))",
                      "surface-100": "rgb(var(--surface-100))",
                      "surface-200": "rgb(var(--surface-200))",
                      "surface-300": "rgb(var(--surface-300))",
                      "surface-400": "rgb(var(--surface-400))",
                      "surface-500": "rgb(var(--surface-500))",
                      "surface-600": "rgb(var(--surface-600))",
                      "surface-700": "rgb(var(--surface-700))",
                      "surface-800": "rgb(var(--surface-800))",
                      "surface-900": "rgb(var(--surface-900))",
                      "surface-950": "rgb(var(--surface-950))",
                  },
              },
          },
      }
  },
  vite: {
    server: {
        fs: {
            allow: ["/home/www24/cobanx/"]
        }
    }
  }
})
