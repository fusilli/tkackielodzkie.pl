module.exports = function(eleventyConfig) {
  
  const htmlmin = require("html-minifier");
  const markdownIt = require("markdown-it");
  const markdownItAnchor = require("markdown-it-anchor");
  const markdownLib = markdownIt({html:true}).use(markdownItAnchor);
  const cacheBuster = require('@mightyplow/eleventy-plugin-cache-buster');

  const cacheBusterOptions = { outputDirectory: "_site" };
  eleventyConfig.setLibrary("md", markdownLib);
  eleventyConfig.addPassthroughCopy("assets/img");

  eleventyConfig.addFilter("cudzyslowy", str => {
    return str.replace(/([\s][\(]?)(&quot;)([\S])/g, "\$1&bdquo;\$3").replace(/([\S])(&quot;)([\)]?[\s])/g, "\$1&rdquo;\$3");
  });

  eleventyConfig.addFilter("sierotki", str => {
    return str.replace(/([ ](<em>)?(<strong>)?[\(]?[„]?[a|i|o|u|w|z])([ ])/gi, "\$1&nbsp;");
  });

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
    },
    passthroughFileCopy: true
  };
};