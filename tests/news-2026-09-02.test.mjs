import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const pagePath = path.join(root, "news", "2026-09-02.html");

function evaluateConstFile(filePath, expression) {
    const context = {};
    vm.createContext(context);
    const source = fs.readFileSync(filePath, "utf8");
    return vm.runInContext(`${source}\n;${expression}`, context);
}

test("2026-09-02 workshop report is the newest news item", () => {
    const newsData = evaluateConstFile(path.join(root, "news-data.js"), "newsData");
    assert.equal(newsData[0].date, "2026-09-02");
    assert.equal(newsData[0].url, "news/2026-09-02.html");
    assert.match(newsData[0].title.zh, /热物性理论与计算讲习班在长沙成功举办/);
});

test("2026-09-02 workshop report has localized detail content", () => {
    const detailData = evaluateConstFile(path.join(root, "news-detail-data.js"), "newsDetailData");
    const report = detailData["2026-09-02.html"];
    assert.equal(report.date, "2026-09-02");
    assert.match(report.body.zh, /131位/);
    assert.match(report.body.zh, /CALTPP/);
    assert.match(report.body.en, /131/);
});

test("2026-09-02 detail page and its selected photos exist", () => {
    assert.ok(fs.existsSync(pagePath));
    const html = fs.readFileSync(pagePath, "utf8");
    assert.match(html, /发布日期：2026-09-02/);
    assert.match(html, /2026年热物性理论与计算讲习班在长沙成功举办/);

    const images = [...html.matchAll(/<img[^>]+src="\.\.\/(assets\/news-260902-img\d+\.jpg)"/g)]
        .map((match) => match[1]);
    assert.equal(images.length, 11, `expected all 11 article photos, found ${images.length}`);
    assert.deepEqual(
        [...new Set(images)].sort(),
        Array.from({ length: 11 }, (_, index) => `assets/news-260902-img${index + 1}.jpg`).sort()
    );
    for (const image of images) {
        assert.ok(fs.existsSync(path.join(root, image)), `missing image: ${image}`);
    }
});

test("homepage and news list request the current news-data version", () => {
    for (const file of ["index.html", "news.html"]) {
        const html = fs.readFileSync(path.join(root, file), "utf8");
        assert.match(html, /<script src="news-data\.js\?v=20260902"><\/script>/, file);
    }
});
