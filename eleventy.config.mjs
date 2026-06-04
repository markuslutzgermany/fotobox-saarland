// Eleventy 3.x config — fotobox.saarland
// Docs: https://www.11ty.dev/docs/config/

import fs from "node:fs";
import path from "node:path";

export default function (eleventyConfig) {
  // Pass-through copy: assets, CSS, _redirects, robots.txt, favicons
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/_redirects": "_redirects" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.ico": "favicon.ico" });

  // Watch CSS for live-reload
  eleventyConfig.addWatchTarget("src/css/");

  // Year shortcode (für Footer-Copyright)
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Date-Filter für Blog (de-DE Format: "4. Juni 2026")
  eleventyConfig.addFilter("dateDe", (d) =>
    new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "long", year: "numeric" }).format(new Date(d))
  );

  // ISO-Datum für <time datetime>-Attribute + RSS
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString());

  // Picture-Shortcode mit WebP-Fallback
  // Schaut zur Build-Zeit ob neben dem JPG/PNG eine .webp existiert.
  // Wenn ja: <picture> mit WebP-Source + JPG/PNG-Fallback.
  // Wenn nein: nur <img>. Markus kann jedes Bild einfach mit {% pic ... %} ausspielen.
  //
  // Usage:
  //   {% pic "/assets/img/foo.jpg", "Alt-Text" %}
  //   {% pic "/assets/img/foo.jpg", "Alt-Text", "lazy", "css-class", 1280, 853 %}
  eleventyConfig.addShortcode("pic", function(src, alt, loading = "lazy", cls = "", width = "", height = "") {
    const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, ".webp");
    const webpFsPath = path.join("src", webpSrc);
    const origFsPath = path.join("src", src);

    // WebP nur ausspielen wenn (a) existiert UND (b) kleiner als Original-Datei
    // — sonst wäre die "Optimierung" eine Verlangsamung.
    let hasWebP = false;
    if (fs.existsSync(webpFsPath) && fs.existsSync(origFsPath)) {
      hasWebP = fs.statSync(webpFsPath).size < fs.statSync(origFsPath).size;
    }

    const attrs = [
      `src="${src}"`,
      `alt="${alt}"`,
      `loading="${loading}"`,
      cls ? `class="${cls}"` : "",
      width ? `width="${width}"` : "",
      height ? `height="${height}"` : ""
    ].filter(Boolean).join(" ");

    const imgTag = `<img ${attrs}>`;

    if (hasWebP) {
      return `<picture><source srcset="${webpSrc}" type="image/webp">${imgTag}</picture>`;
    }
    return imgTag;
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}
