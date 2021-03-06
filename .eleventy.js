module.exports = function(eleventyConfig) {
  
  const siteData = require("./views/_data/site.json");
  const { cloudinaryUrl } = siteData;
  const htmlmin = require("html-minifier");
  const markdownIt = require("markdown-it");
  const markdownItAnchor = require("markdown-it-anchor");
  const markdownLib = markdownIt({html:true}).use(markdownItAnchor);
  const cacheBuster = require("@mightyplow/eleventy-plugin-cache-buster");

  const cacheBusterOptions = { outputDirectory: "_site" };

  eleventyConfig.setLibrary("md", markdownLib);
  eleventyConfig.addPassthroughCopy("assets/mapa");
  eleventyConfig.addPassthroughCopy("assets/img");
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
    return `<figure><img class="mx-auto" src="${cloudinaryUrl}c_limit,w_600/${file}" srcset="${cloudinaryUrl}c_limit,w_900/${file} 900w, ${cloudinaryUrl}c_limit,w_600/${file} 600w, ${cloudinaryUrl}c_limit,w_300/${file} 300w" sizes="(max-width: 320px) 300px, (max-width: 620px) 600px, 100vw"   ${ podpis ? `alt="${podpis}"` : ``} data-action="zoom" loading="lazy"> ${ podpis ? `<figcaption class="text-xl text-center text-gray-600">${podpis}</figcaption>` : ``}</figure>`;
  });

  eleventyConfig.addShortcode("zespol", (file, nazwisko = "", podpis = "") => {
    return `<figure class="zespol sm_my-2 sm_mr-4 sm_float-left"><img class="mx-auto" src="${cloudinaryUrl}c_lfill,w_400,h_400/${file}" ${ nazwisko ? `alt="${nazwisko}"` : ``} width="200" height="200" loading="lazy"> ${ podpis ? `<figcaption class="text-lg text-center text-gray-600">${podpis}</figcaption>` : ``}</figure>`;
  });

  eleventyConfig.addShortcode("youtube", (url, podpis = "") => {
    return `<figure><div class="relative h-0 overflow-hidden" style="padding-bottom: 56.25%;"><iframe src="//www.youtube.com/embed/${url}" class="absolute top-0 left-0 w-full h-full border-0" allowfullscreen></iframe></div>${ podpis ? `<figcaption class="text-xl text-center text-gray-600">${podpis}</figcaption>` : ``}</figure>`;
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