module.exports = {
	plugins: [
		require("tailwindcss")("./assets/tailwind/tailwind.config.js"),
		require("autoprefixer")({
			grid: false,
			browsers: [">1%"]
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