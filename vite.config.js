import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/MIAppR-D/', // 👈 ¡esto es crítico!
  plugins: [react()],
})
