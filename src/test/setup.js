// 全局测试引导文件：在每个测试文件运行前执行一次。
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// 每个用例结束后卸载已渲染的组件，避免用例之间互相污染 DOM。
afterEach(() => {
  cleanup();
});
