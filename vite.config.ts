/// <reference types="vitest" />
import path from 'path'

import react from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import SassDTS from 'vite-plugin-sass-dts'
// import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/hcs-tournament-schedule/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
  plugins: [
    react(),
    // WindiCSS({
    //   transformCSS: 'pre',
    //   scan: {
    //     dirs: ['src'], // all files in the cwd
    //     fileExtensions: ['tsx', 'js', 'ts'], // also enabled scanning for js/ts
    //   },
    // }),
    Icons({
      compiler: 'jsx',
      jsx: 'react',
      customCollections: {
        'hcs-icons': FileSystemIconLoader('./src/assets/icons'),
      },
    }),
    VitePWA({
      base: '/hcs-tournament-schedule/',
      // srcDir: 'src',
      // filename: 'sw.ts',
      strategies: 'generateSW',
      // includeAssets: ['favicon.ico', 'robots.txt'],
      manifest: {
        name: 'HCS Tournament Schedule',
        short_name: 'HCS Schedule',
        description: 'Schedule HCS Halo Infinite Tournaments',
        theme_color: '#1f2937',
        start_url: '.',
        display: 'standalone',
        background_color: '#374151',
        icons: [
          {
            src: 'android-chrome-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'android-chrome-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
          },
          {
            src: 'mstile-150x150.png',
            size: '150x150',
            type: 'image/png',
          },
          {
            src: 'android-chrome-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: 'safari-pinned-tab.svg',
            type: 'image/svg',
          },
        ],
      },
      devOptions: {
        enabled: true,
        /* when using generateSW the PWA plugin will switch to classic */
        type: 'module',
        navigateFallback: 'index.html',
      },
    }),
    AutoImport({
      imports: [
        'react',
        'react-i18next',
        {
          react: ['createContext', 'Fragment'],
        },
      ],
      eslintrc: {
        enabled: true,
      },
      dts: true,
    }),
    SassDTS(),
  ],
})
