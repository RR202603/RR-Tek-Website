import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const rootFiles = (await readdir(root)).filter((file) => file.endsWith(".html"));
const newsFiles = (await readdir(new URL("../news/", import.meta.url)))
    .filter((file) => file.endsWith(".html"))
    .map((file) => `news/${file}`);
const pages = [...rootFiles, ...newsFiles];

for (const page of pages) {
    const html = await readFile(new URL(`../${page}`, import.meta.url), "utf8");
    const prefix = page.startsWith("news/") ? "../" : "";
    assert.ok(
        html.includes(`<link rel="stylesheet" href="${prefix}online-contact.css"`),
        `${page} 应加载在线联系公共样式`
    );
    assert.ok(
        html.includes(`<script src="${prefix}online-contact.js"></script>`),
        `${page} 应加载在线联系公共脚本`
    );
}

const css = await readFile(new URL("../online-contact.css", import.meta.url), "utf8");
assert.match(css, /position:\s*fixed/, "在线联系入口应固定在视口右下角");
assert.match(css, /bottom:\s*max\(/, "入口应兼容手机安全区域");
assert.match(css, /@media\s*\(max-width:\s*640px\)/, "应提供手机端圆形按钮布局");
assert.match(css, /prefers-reduced-motion/, "应尊重减少动态效果的系统设置");

const js = await readFile(new URL("../online-contact.js", import.meta.url), "utf8");
assert.ok(js.includes("RRTekOnlineContact"), "脚本应预留美洽配置入口");
assert.ok(js.includes("onlineContactPreview"), "实名认证完成前应支持仅限本地的预览模式");
assert.ok(js.includes("aria-label"), "客服入口应提供无障碍名称");
assert.ok(js.includes("在线联系"), "应提供中文按钮文案");
assert.ok(js.includes("Online Chat"), "应提供英文按钮文案");
assert.ok(js.includes("Chat en ligne"), "应提供法文按钮文案");

console.log(`online contact checks passed for ${pages.length} pages`);
