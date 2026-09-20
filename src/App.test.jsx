import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

// 真实动画要靠 requestAnimationFrame 逐帧推进，在 jsdom 里既慢又不稳定。
// 这里的断言对象是"渲染出什么"，不是"动画怎么跑"，所以把 animejs 换成空实现。
vi.mock("animejs", () => ({
  animate: vi.fn(),
  stagger: vi.fn(() => 0),
  scrambleText: vi.fn(() => ""),
}));

import App from "./App.jsx";
import { home, textLab } from "./data/site.js";

// 大标题（h1）由 site.js 提供；注意导航里也有"文字实验室"链接，
// 所以统一用 heading 角色取元素，避免文本重复导致匹配到多个节点。
const heading = () => screen.getByRole("heading", { level: 1 });

describe("App 页面与路由", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/");
  });

  it("地址栏为 / 时渲染个人主页", () => {
    render(<App />);
    expect(heading()).toHaveTextContent(home.heroTitle);
    expect(screen.getByText(home.heroSubtitle)).toBeInTheDocument();
  });

  it("地址栏为 /text-lab 时渲染文字实验室（刷新不丢页面）", () => {
    window.history.pushState({}, "", "/text-lab");
    render(<App />);
    expect(heading()).toHaveTextContent(textLab.heroTitle);
  });

  it("点击「打开作品」把地址栏推进到 /text-lab", () => {
    render(<App />);
    fireEvent.click(screen.getByText(home.featuredWork.linkLabel));
    expect(window.location.pathname).toBe("/text-lab");
    expect(heading()).toHaveTextContent(textLab.heroTitle);
  });
});
