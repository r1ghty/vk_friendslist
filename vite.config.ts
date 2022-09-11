import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  plugins: [reactRefresh(), basicSsl()],
  server: {
    port: 10888,
    https: true,
    hmr: false
  }
})
