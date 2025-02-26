import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Node.js 환경에서만 webcrypto 설정 추가
if (typeof global !== "undefined" && !global.crypto) {
  import('node:crypto').then((crypto) => {
    global.crypto = crypto.webcrypto;
  });
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
})