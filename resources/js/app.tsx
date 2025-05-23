import { hydrateRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { Providers } from "@/components/providers";
import "../css/app.css";

const appName = import.meta.env.VITE_APP_NAME || "Task | Jose Ederango Jr";

createInertiaApp({
	title: (title) => `${title} - ${appName}`,
	resolve: (name) => {
		return resolvePageComponent(
			`./pages/${name}.tsx`,
			import.meta.glob("./pages/**/*.tsx"),
		);
	},
	setup({ el, App, props }) {
		hydrateRoot(
			el,
			<Providers>
				<App {...props} />
			</Providers>,
		);
	},
	progress: {
		color: "#4B5563",
	},
});
