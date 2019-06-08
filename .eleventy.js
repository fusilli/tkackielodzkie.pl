module.exports = function(eleventyConfig) {
  
  const htmlmin = require("html-minifier");
  const markdownIt = require("markdown-it");
  const markdownItAnchor = require("markdown-it-anchor");
  const markdownLib = markdownIt({html:true}).use(markdownItAnchor);
  const cacheBuster = require('@mightyplow/eleventy-plugin-cache-buster');

  const cacheBusterOptions = { outputDirectory: "_site" };
  eleventyConfig.setLibrary("md", markdownLib);

  if ( process.env.NODE_ENV !== "development" ) {
    eleventyConfig.addPlugin(cacheBuster(cacheBusterOptions));
    eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
      if ( outputPath.endsWith(".html") ) {
        let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true
        });
        return minified;
      }
      return content;
    });
  }

  return {
    dir: {
      input: "views"
    }
  };
};