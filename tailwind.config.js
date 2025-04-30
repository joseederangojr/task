import forms from "@tailwindcss/forms";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: [
		"./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
		"./storage/framework/views/*.php",
		"./resources/views/**/*.blade.php",
		"./resources/js/**/*.tsx",
	],

	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				// Catppuccin palette
				catppuccin: {
					// Accent colors (shared between themes)
					rosewater: { DEFAULT: "#dc8a78", dark: "#f5e0dc" },
					flamingo: { DEFAULT: "#dd7878", dark: "#f2cdcd" },
					pink: { DEFAULT: "#ea76cb", dark: "#f5c2e7" },
					mauve: { DEFAULT: "#8839ef", dark: "#cba6f7" },
					red: { DEFAULT: "#d20f39", dark: "#f38ba8" },
					maroon: { DEFAULT: "#e64553", dark: "#eba0ac" },
					peach: { DEFAULT: "#fe640b", dark: "#fab387" },
					yellow: { DEFAULT: "#df8e1d", dark: "#f9e2af" },
					green: { DEFAULT: "#40a02b", dark: "#a6e3a1" },
					teal: { DEFAULT: "#179299", dark: "#94e2d5" },
					sky: { DEFAULT: "#04a5e5", dark: "#89dceb" },
					sapphire: { DEFAULT: "#209fb5", dark: "#74c7ec" },
					blue: { DEFAULT: "#1e66f5", dark: "#89b4fa" },
					lavender: { DEFAULT: "#7287fd", dark: "#b4befe" },
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
	},
	plugins: [forms, require("tailwindcss-animate")],
};
