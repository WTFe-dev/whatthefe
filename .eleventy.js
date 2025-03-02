const { DateTime } = require("luxon");
const htmlmin = require("html-minifier-terser");
const CleanCSS = require("clean-css");
const terser = require("terser");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function (eleventyConfig) {
  // Syntax highlighting for code blocks
  eleventyConfig.addPlugin(syntaxHighlight);

  // Configure Markdown with markdown-it and an anchor plugin
  let mdOptions = {
    html: true,
    breaks: true,
    linkify: true,
  };
  let mdLib = markdownIt(mdOptions).use(markdownItAnchor, {
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: "#",
  });
  eleventyConfig.setLibrary("md", mdLib);

  // Minify HTML output
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true
      });
      return minified;
    }
    return content;
  });

  // CSS minification filter
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // JavaScript minification filter
  eleventyConfig.addNunjucksAsyncFilter("jsmin", async function (code, callback) {
    try {
      const minified = await terser.minify(code);
      callback(null, minified.code);
    } catch (err) {
      console.error("Terser error: ", err);
      callback(err, code);
    }
  });

  // Create a collection of all tags
  eleventyConfig.addCollection("tagList", function (collection) {
    let tagSet = new Set();
    collection.getAll().forEach((item) => {
      if ("tags" in item.data) {
        let tags = item.data.tags;
        tags.forEach((tag) => tagSet.add(tag));
      }
    });
    return [...tagSet];
  });

  // Filter to return posts for a given tag
  eleventyConfig.addFilter("filterTag", function (collection, tag) {
    return collection.filter((item) => item.data.tags && item.data.tags.includes(tag));
  });

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat("dd LLL yyyy");
  });

  eleventyConfig.addFilter("dateToISO", dateObj => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toISO();
  });

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
