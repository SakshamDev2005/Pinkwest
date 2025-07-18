import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


const link = "https://cfaaab3684ef.ngrok-free.app/"



// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: [link.replace("https://","").replace("/","")],
  },
})
