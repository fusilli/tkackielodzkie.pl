module.exports = {
	plugins: [
		require("tailwindcss")("./assets/tailwind.config.js"),
		require('postcss-nested'),
		require("autoprefixer")({
			grid: false
		}),
		...(process.env.NODE_ENV !== "development"
			? [
					require("@fullhuman/postcss-purgecss")({
						content: ["./views/**/*.html", "./views/**/*.njk"],
						extractors: [
							{
								extractor: class {
									static extract(content) {
										return content.match(/[A-z0-9-:\/]+/g) || [];
									}
								},
								extensions: ["html"]
							}
						]
					})
			  ]
			: []) //If Development, do not use PurgeCSS
	]
};