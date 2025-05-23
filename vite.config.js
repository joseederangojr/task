/* eslint-disable no-undef */
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import removeAttr from "remove-attr";
import tailwind from "@tailwindcss/vite";
import path from "node:path";

const plugins =
	process.env.NODE_ENV === "production"
		? [
				removeAttr({
					extensions: ["tsx"],
					attributes: ["data-dusk"],
				}),
			]
		: [];

export default defineConfig({
	plugins: [
		laravel({
			input: "resources/js/app.tsx",
			ssr: "resources/js/ssr.tsx",
			refresh: true,
		}),
		react(),
		tailwind(),
		...plugins,
	],

	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./resources/js"),
		},
	},
});
