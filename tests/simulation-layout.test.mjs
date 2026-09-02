import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../simulation.html", import.meta.url), "utf8");
const css = await readFile(new URL("../simulation.css", import.meta.url), "utf8");
const i18n = await readFile(new URL("../i18n.js", import.meta.url), "utf8");

assert.ok(html.includes(">计算服务</h2>"), "计算服务主标题应保留");
assert.ok(!html.includes("What We Calculate"), "应删除英文小标题 What We Calculate");
assert.ok(
    !html.includes("围绕材料“成分—工艺—组织—性能”关系，提供以下六类计算服务。"),
    "应删除六类计算服务的说明文字"
);

const panelHeadingRule = css.match(/\.calculation-panel-heading\s*\{([\s\S]*?)\}/)?.[1] || "";
assert.ok(!/display:\s*grid/.test(panelHeadingRule), "分类标题和说明不应左右网格排列");
assert.ok(!/grid-template-columns/.test(panelHeadingRule), "分类标题和说明应改为上下排列");

const catalogRule = css.match(/\.calculation-catalog\s*\{([\s\S]*?)\}/)?.[1] || "";
const categoryNavRule = css.match(/\.calculation-category-nav\s*\{([\s\S]*?)\}/)?.[1] || "";
assert.ok(/align-items:\s*stretch/.test(catalogRule), "桌面端左右两栏应等高拉伸");
assert.ok(/position:\s*static/.test(categoryNavRule), "左侧分类表格不应使用悬浮定位");
assert.ok(/display:\s*grid/.test(categoryNavRule), "左侧分类表格应使用网格等分高度");
assert.ok(/grid-template-rows:\s*repeat\(6,\s*minmax\(0,\s*1fr\)\)/.test(categoryNavRule), "六个分类按钮应平均分配表格高度");

assert.ok(html.includes("粘度与热导率计算"), "第三类服务应命名为粘度与热导率计算");
assert.ok(!html.includes("conductivity-reverse-design.png"), "不应展示反向设计图卡");
assert.ok(!html.includes("反向设计"), "中文页面不应出现反向设计");
assert.ok(!i18n.includes('zh: "热物性与反向设计"'), "多语言配置中的中文分类名称也应更新");
assert.ok(!html.includes("slag-viscosity-window.png"), "不应展示煤灰渣粘度工艺窗口图卡");
assert.ok(html.includes(">合金粘度</h4>"), "合金粘度卡片应使用通用标题");
assert.ok(html.includes(">液态粘度</h4>"), "液态粘度卡片应使用通用标题");
assert.ok(!html.includes(">MgO-Al2O3-SiO2 液态粘度</h4>"), "功能标题不应限定具体氧化物体系");
assert.ok(html.includes('data-i18n="simulationPage.catalog.mesoSpinodal">调幅分解</h4>'), "调幅分解卡片应使用通用标题");
assert.ok(html.includes('data-i18n="simulationPage.catalog.mesoDiscontinuousPrecipitation">不连续析出</h4>'), "不连续析出卡片应使用通用标题");
assert.ok(html.includes('data-i18n="simulationPage.catalog.electrodeChargeDischarge">电极充放电相变模拟</h4>'), "电极充放电卡片应使用通用标题");
assert.ok(i18n.includes('mesoSpinodal: { zh: "调幅分解"'), "多语言配置应提供通用调幅分解名称");
assert.ok(i18n.includes('mesoDiscontinuousPrecipitation: { zh: "不连续析出"'), "多语言配置应提供通用不连续析出名称");
assert.ok(i18n.includes('electrodeChargeDischarge: { zh: "电极充放电相变模拟"'), "多语言配置应提供通用电极充放电名称");
assert.ok(html.includes('data-i18n="simulationPage.catalog.uniaxialTension">单轴拉伸模拟</h4>'), "单轴拉伸卡片应使用通用标题");
assert.ok(!html.includes(">Al-Mg-Si 合金单轴拉伸模拟</h4>"), "单轴拉伸功能标题不应限定具体合金体系");
assert.ok(i18n.includes('uniaxialTension: { zh: "单轴拉伸模拟"'), "多语言配置应提供通用单轴拉伸名称");

console.log("simulation layout checks passed");
