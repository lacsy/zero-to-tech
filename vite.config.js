import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 部署在子路径下时（例如 GitHub Pages 的 https://<user>.github.io/zero-to-tech/），
// 静态资源的引用前缀必须跟着变，否则页面会去根路径找 js/css 而 404。
// 由构建环境通过 BASE_PATH 注入；本地开发、Nginx 根路径部署时保持 "/"。
const base = process.env.BASE_PATH || "/";

export default defineConfig({
  base,
  plugins: [react()],
  test: {
    // 组件渲染需要 DOM；用 jsdom 模拟浏览器环境
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.js",
    // 测试不关心 CSS 内容，关掉可跳过一堆无意义的样式解析
    css: false,
    include: ["src/**/*.test.{js,jsx}"],
  },
});
