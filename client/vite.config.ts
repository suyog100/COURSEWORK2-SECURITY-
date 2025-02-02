import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //tried to disable source map but failed
  // build: {
  //   sourcemap: false, // Ensure source maps are disabled
  //   minify: "terser", // Use Terser for better obfuscation
  //   rollupOptions: {
  //     output: {
  //       manualChunks: undefined, // Avoid unnecessary splitting
  //     },
  //   },
  // },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "cert.pem")),
    },
  },
 

});
