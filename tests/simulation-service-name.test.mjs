import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const files = ["index.html", "service.html", "simulation.html", "i18n.js"];
const contents = await Promise.all(
    files.map(async (file) => [file, await readFile(new URL(`../${file}`, import.meta.url), "utf8")])
);

for (const [file, content] of contents) {
    assert.ok(!content.includes("委托计算模拟"), `${file} 不应继续使用旧业务名称`);
    assert.ok(!content.includes("Commissioned Materials Simulation"), `${file} 不应继续使用旧英文名称`);
    assert.ok(!content.includes("Simulation des matériaux sur commande"), `${file} 不应继续使用旧法文名称`);
}

const simulationHtml = contents.find(([file]) => file === "simulation.html")[1];
const i18n = contents.find(([file]) => file === "i18n.js")[1];

assert.ok(simulationHtml.includes(">材料计算与模拟服务</h1>"), "simulation 页面主标题应使用新名称");
assert.ok(i18n.includes('zh: "材料计算与模拟服务"'), "中文翻译应包含新名称");
assert.ok(i18n.includes('en: "Materials Computing & Simulation Services"'), "英文翻译应包含新名称");
assert.ok(i18n.includes('fr: "Services de calcul et de simulation des matériaux"'), "法文翻译应包含新名称");

console.log("simulation service naming checks passed");
