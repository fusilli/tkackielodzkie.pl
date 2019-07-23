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
						content: ["./views/**/*.html", "./views/**/*.njk", "./views/**/*.md"],
						extractors: [
							{
								extractor: class {
									static extract(content) {
										return content.match(/[A-Za-z0-9-_:/]+/g) || [];
									}
								},
								extensions: ["html"]
							}
						],
						whitelist: ["hr", "figure", "figcaption", "mx-auto", "text-xl", "text-center","text-gray-600", "relative", "h-0", "overflow-hidden", "absolute", "top-0", "left-0", "w-full", "h-full", "border-0", "text-xl", "text-center", "text-gray-600"]
					})
			  ]
			: []) //If Development, do not use PurgeCSS
	]
};