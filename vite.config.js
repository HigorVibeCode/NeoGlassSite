import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// SOLO=1 gera um único .html, sem servidor, para abrir com dois cliques.
const solo = process.env.SOLO === '1'

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), ...(solo ? [viteSingleFile()] : [])],
  build: { outDir: solo ? 'dist-solo' : 'dist' },
  server: { port: 5180, host: true },
})
