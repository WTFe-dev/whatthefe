const { DateTime } = require("luxon");
const htmlmin = require("html-minifier-terser");
const CleanCSS = require("clean-css");
const terser = require("terser");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItContainer = require("markdown-it-container");


module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  const markdownLib = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  })

  let extendedMarkdownLib = markdownLib.use(markdownItAnchor, {
    permalinkBefore: false,
    permalinkSymbol: "#",
  });
  const callouts = ["note", "tip", "important", "warning", "caution"];
  callouts.forEach(callout => {
    markdownLib.use(markdownItContainer, callout, {
      render: (tokens, idx) =>
        tokens[idx].nesting === 1
          ? `<blockquote class="${callout}">\n`
          : "</blockquote>\n",
    });
  });
  eleventyConfig.setLibrary("md", extendedMarkdownLib);

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

  eleventyConfig.addTransform("cssmin", function (content, outputPath) {
    if (outputPath && outputPath.endsWith(".css")) {
      return new CleanCSS({}).minify(content).styles;
    }
    return content;
  });
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

  eleventyConfig.addFilter("filterTag", function (collection, tag) {
    return collection.filter((item) => item.data.tags && item.data.tags.includes(tag));
  });

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat("dd.MM.yy");
  });

  eleventyConfig.addFilter("dateToISO", dateObj => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toISO();
  });

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/styles");

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    eleventyComputed: {
      title: (data) => `#${data.tag ? data.tag : "noTag"}`
    }
  };
};
