import { createRequire } from "node:module";
const require = createRequire("/Users/lacy/repo/buildandserve/package.json");
const { chromium } = require("playwright-core");
const [,, base, outDir] = process.argv;
const routes = ["/","/pricing","/faq","/features","/contact","/sign-in","/sign-up","/blog","/blog/getting-started","/docs","/docs/getting-started","/changelog","/legal","/privacy-policy","/terms-of-service","/cli","/waitlist","/bones/cli-www","/this-page-does-not-exist-404"];
const slug = (r) => r === "/" ? "home" : r.slice(1).replace(/\//g, "_");
const browser = await chromium.launch({ executablePath: process.env.CHROME });
for (const scheme of ["light","dark"]) {
  const ctx = await browser.newContext({ viewport: {width:1440,height:900}, colorScheme: scheme });
  await ctx.addInitScript((s) => { try { localStorage.setItem("theme", s); } catch {} }, scheme);
  for (const r of routes) {
    const p = await ctx.newPage();
    try {
      const resp = await p.goto(base + r, { waitUntil: "load", timeout: 45000 });
      await p.waitForTimeout(3500);
      await p.screenshot({ path: `${outDir}/${slug(r)}-${scheme}.png`, fullPage: true });
      console.log(scheme, r, resp?.status());
    } catch (e) { console.log(scheme, r, "ERR", e.message.slice(0,80)); }
    await p.close();
  }
  await ctx.close();
  if (scheme === "light" || scheme === "dark") {
    const m = await browser.newContext({ viewport: {width:390,height:844}, colorScheme: scheme });
    await m.addInitScript((s) => { try { localStorage.setItem("theme", s); } catch {} }, scheme);
    const p = await m.newPage();
    await p.goto(base + "/", { waitUntil: "load", timeout: 45000 });
    await p.waitForTimeout(3500);
    await p.screenshot({ path: `${outDir}/home-mobile-${scheme}.png`, fullPage: true });
    await m.close();
  }
}
await browser.close();
