import fs from "node:fs";

const sourcePath = process.argv[2];
const targetPath = process.argv[3];

if (!sourcePath || !targetPath) {
  throw new Error("Usage: node scripts/import-news-content.mjs source.json target.js");
}

const payload = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
const news = payload?.data?.data ?? [];

function sanitize(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<(section|div)[^>]*>/gi, "")
    .replace(/<\/(section|div)>/gi, "")
    .replace(/<(span|font)[^>]*>/gi, "")
    .replace(/<\/(span|font)>/gi, "")
    .replace(/\s(class|style|data-[\w-]+)="[^"]*"/gi, "")
    .replace(/\s(width|height)="[^"]*"/gi, "")
    .replace(/src="http:\/\/www\.xqls\.tech\//gi, 'src="https://www.xqls.tech/')
    .replace(/<p>(?:\s|&nbsp;)*<\/p>/gi, "")
    .replace(/<p>\s*(<img[^>]*>)\s*<\/p>/gi, "$1")
    .replace(/<img([^>]*?)>/gi, '<img$1 loading="lazy">')
    .replace(/(?:\s|&nbsp;){2,}/gi, " ")
    .trim();
}

const contents = Object.fromEntries(news.map((item) => [String(item.newsId), sanitize(item.content || "")]));
const output = `window.newsContents = ${JSON.stringify(contents, null, 2)};\n`;
fs.writeFileSync(targetPath, output);
