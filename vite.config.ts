// vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import CopyPlugin from "vite-plugin-files-copy";
import eslintPlugin from "vite-plugin-eslint";
import { resolve } from "path";

function pathResolve(dir) {
  return resolve(__dirname, ".", dir);
}

const myOutPutDir = "./dist";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // babel(),
    eslintPlugin({
      cache: false
    })
    // CopyPlugin({
    //   patterns: [
    //     { from: "./src/assets/css", to: myOutPutDir + "/static/css" },
    //     { from: "./src/assets/js", to: myOutPutDir + "/static/js" },
    //     { from: "./src/assets/json", to: myOutPutDir + "/static/json" },
    //     { from: "./src/assets/pic", to: myOutPutDir + "/static/pic" }
    //   ]
    // })
    // viteStaticCopy({
    //   targets: [{ src: "./src/assets/css", dest: myOutPutDir + "/static/css" }]
    // }),
    // copy({
    //   targets: [{ src: "./src/static/css", dest: myOutPutDir + "/static/css" }],
    //   // targets: [{ src: "static/css", dest: "dist/public" }],
    //   verbose: true
    // })
    // legacy({
    //   polyfills: ["es.promise.finally", "es/map", "es/set"],
    //   modernPolyfills: ["es.promise.finally"],
    //   targets: ["last 1 version", "> 1%", "ie 11"]
    // })
  ],
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
    charset: "utf8"
  },
  resolve: {
    alias: {
      "@": pathResolve("src")
    }
  },
  // publicDir: "/public",
  build: {
    outDir: myOutPutDir,
    assetsDir: "static/"
  },
  base: "./",
  server: {
    // open: true, // 在服务器启动时自动在浏览器中打开应用程序
    // //host: 'localhost',  // 指定服务器主机名
    // // host: '0.0.0.0',
    // // host: '::',
    port: 3000, // 指定服务器端口
    // 为开发服务器配置自定义代理规则
    proxy: {
      "/backend": {
        target: "http://localhost:8081/mybigdata/",
        changeOrigin: true
        // rewrite: (path) => path.replace(/^\/backend/, "")
      }
      // "/druid": {
      //   target: "http://localhost:8081/druid",
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/druid/, "")
      // }
    }
  }
});
