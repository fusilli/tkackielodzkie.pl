module.exports = function(eleventyConfig) {
  
  const htmlmin = require("html-minifier");
  const markdownIt = require("markdown-it");
  const markdownItAnchor = require("markdown-it-anchor");
  const markdownLib = markdownIt({html:true}).use(markdownItAnchor);
  const cacheBuster = require('@mightyplow/eleventy-plugin-cache-buster');

  const cacheBusterOptions = { outputDirectory: "_site" };

  eleventyConfig.setLibrary("md", markdownLib);
  eleventyConfig.addPassthroughCopy("foto");
  eleventyConfig.addPassthroughCopy("assets/mapa");
  eleventyConfig.addFilter("cudzyslowy", str => {
    return str.replace(/([\s][\(]?)(&quot;)([\S])/g, "\$1&bdquo;\$3").replace(/([\S])(&quot;)([\)]?[\s])/g, "\$1&rdquo;\$3");
  });

  eleventyConfig.addFilter("sierotki", str => {
    return str.replace(/([ ](<em>)?(<strong>)?[\(]?[„]?[a|i|o|u|w|z])([ ])/gi, "\$1&nbsp;");
  });

  eleventyConfig.addShortcode("rok", () => {
    return `${new Date().getUTCFullYear()}`;
  });

  eleventyConfig.addShortcode("foto", (file, podpis = "") => {
    return `<figure><img class="mx-auto" src="/foto/${file}" ${ podpis ? `alt="${podpis}"` : ``} >${ podpis ? `<figcaption class="text-xl text-center text-gray-600">${podpis}</figcaption>` : ``}</figure>`;
  });

  eleventyConfig.addShortcode("youtube", (url, podpis = "") => {
    return `<figure><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="//www.youtube.com/embed/${url}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen></iframe></div>${ podpis ? `<figcaption class="text-xl text-center text-gray-600">${podpis}</figcaption>` : ``}</figure>`;
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
    passthroughFileCopy: true,
    markdownTemplateEngine: "njk"
  };
};