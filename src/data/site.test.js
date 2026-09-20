import { describe, it, expect } from "vitest";
import { home, textLab } from "./site.js";

// site.js 是整个站点的"内容源"——组件只负责显示，不负责内容。
// 所以这里对数据做契约测试：字段少了、改名了，构建阶段就能拦住。
describe("site.js 站点数据", () => {
  it("两个页面都具备标题与副标题", () => {
    expect(home.heroTitle).toBeTruthy();
    expect(home.heroSubtitle).toBeTruthy();
    expect(textLab.heroTitle).toBeTruthy();
    expect(textLab.heroSubtitle).toBeTruthy();
  });

  it("首页包含完整的作品卡片字段", () => {
    expect(home.featuredWork).toMatchObject({
      kicker: expect.any(String),
      title: expect.any(String),
      copy: expect.any(String),
      linkLabel: expect.any(String),
    });
  });

  it("首页包含个人信息区块", () => {
    expect(home.identity).toMatchObject({
      motto: expect.any(String),
      learning: expect.any(String),
    });
  });
});
