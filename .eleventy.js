// .eleventy.js
const { DateTime } = require("luxon");
const htmlmin = require("html-minifier");
const CleanCSS = require("clean-css");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function (eleventyConfig) {
    // Plugins
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    // Copy static assets
    eleventyConfig.addPassthroughCopy("src/assets");

    // Watch CSS files for changes
    eleventyConfig.addWatchTarget("src/assets/css/");
    eleventyConfig.addWatchTarget("src/assets/js/");

    // Date formatting filters
    eleventyConfig.addFilter("readableDate", dateObj => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat("dd LLL yyyy");
    });

    // Add the missing dateToISO filter
    eleventyConfig.addFilter("dateToISO", dateObj => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toISO();
    });

    // Get the first `n` elements of a collection
    eleventyConfig.addFilter("head", (array, n) => {
        if (!Array.isArray(array) || array.length === 0) {
            return [];
        }
        return array.slice(0, n);
    });

    // Return all the tags used in a collection
    eleventyConfig.addFilter("getAllTags", collection => {
        let tagSet = new Set();
        for (let item of collection) {
            (item.data.tags || []).forEach(tag => tagSet.add(tag));
        }
        return Array.from(tagSet);
    });

    // Return all content, ordered by date
    eleventyConfig.addCollection("posts", function (collection) {
        return collection.getFilteredByGlob("src/posts/*.md").sort((a, b) => {
            return b.date - a.date;
        });
    });

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

    // Base Config
    return {
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes",
            data: "data"
        },
        templateFormats: ["md", "njk", "html"],
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk"
    };
};