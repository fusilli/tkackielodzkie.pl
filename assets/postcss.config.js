//console.log("NODE_ENV", process.env.NODE_ENV);
module.exports = {
	plugins: [
		require("tailwindcss"),
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