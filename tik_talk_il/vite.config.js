import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vueDevTools()],
    build: {
        outDir: '../tik_talk_back/public',
    },
    envDir: '.',
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        // Add this server configuration
        proxy: {
            '/api': {
                target: 'http://localhost:3030',
                changeOrigin: true,
                secure: false,
            },
        },
    },
})
