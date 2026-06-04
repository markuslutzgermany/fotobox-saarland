// Eleventy 3.x config — fotobox.saarland
// Docs: https://www.11ty.dev/docs/config/

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
