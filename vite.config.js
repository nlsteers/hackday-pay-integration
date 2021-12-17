import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
    '/payments': {
        target: 'https://publicapi.payments.service.gov.uk/v1/payments',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/payments/, '')
      },
    }
  }
})
