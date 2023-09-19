import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // так же можно настроить alias но в данном случае не имеет смысла
})
