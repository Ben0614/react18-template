import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";
import react from "@vitejs/plugin-react-swc";
import viteCompression from "vite-plugin-compression";
import viteImagemin from "vite-plugin-imagemin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      threshold: 10240,
    }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: "removeViewBox",
          },
          {
            name: "removeEmptyAttrs",
            active: false,
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    outDir: "dist",
    minify: "terser",
    terserOptions: {
      compress: {
        // warnings: false,
        drop_console: true, // 打包時刪除 console
        drop_debugger: true, // 打包時刪除 debugger
      },
      output: {
        // 去掉註釋內容
        comments: true,
      },
    },
    // 關閉文件計算
    reportCompressedSize: false,
    // 關閉生成map文件 可以達到縮小打包體積
    sourcemap: false, // 這個生產環境一定要關閉，不然打包的產物會很大
    // 最小化拆分包
    rollupOptions: {
      output: {
        // 拆分代碼 配置完後自動按需加載
        manualChunks: (id) => {
          // 可以把 id 印出來看，會更清楚知道他的內容
          // console.log('id', id);
          if (id.includes("node_modules")) {
            const arr = id.toString().split("node_modules/")[1].split("/");
            // console.log('arr', arr);

            return arr[0];
          }
        },
      },
    },
  },
});
