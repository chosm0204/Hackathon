import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //   server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://43.203.141.38:8080',
  //       changeOrigin: true,
  //     },
  //   },
  // },
});


