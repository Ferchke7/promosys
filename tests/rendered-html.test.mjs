import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the complete PROMSYS landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /PROMSYS/);
  assert.match(html, /Производство/);
  assert.match(html, /Что мешает производству расти/);
  assert.match(html, /Весь завод/);
  assert.match(html, /Заказать демо/);
  assert.match(html, /https:\/\/promosys\.duda\.uz\//);
  assert.match(html, /rel="canonical"/);
  assert.match(html, /hreflang="uz"/i);
  assert.match(html, /application\/ld\+json/);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});

test("server-renders a crawlable Uzbek version", async () => {
  const response = await render("/uz");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /lang="uz"/);
  assert.match(html, /Ishlab chiqarish/);
  assert.match(html, /https:\/\/promosys\.duda\.uz\/uz/);
  assert.match(html, /hreflang="ru"/i);
});

test("serves robots and multilingual sitemap metadata routes", async () => {
  const robotsResponse = await render("/robots.txt");
  assert.equal(robotsResponse.status, 200);
  const robots = await robotsResponse.text();
  assert.match(robots, /User-Agent: \*/);
  assert.match(robots, /Sitemap: https:\/\/promosys\.duda\.uz\/sitemap\.xml/);

  const sitemapResponse = await render("/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  assert.match(sitemap, /<loc>https:\/\/promosys\.duda\.uz\/<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/promosys\.duda\.uz\/uz<\/loc>/);
  assert.match(sitemap, /hreflang="uz"/);
});
