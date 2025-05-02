import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { Providers } from "@/components/providers";
import "../css/app.css";

const appName = import.meta.env.VITE_APP_NAME || "Task | Jose Ederango Jr";

//@ts-ignore
createServer((app) => {
	return createInertiaApp({
		app,
		title: (title) => `${title} - ${appName}`,
		//@ts-ignore
		render: ReactDOMServer.renderToString,
		resolve: (name) => {
			return resolvePageComponent(
				`./pages/${name}.tsx`,
				import.meta.glob("./pages/**/*.tsx"),
			);
		},
		setup({ App, props }) {
			return (
				<Providers>
					<App {...props} />
				</Providers>
			);
		},
		progress: {
			color: "#4B5563",
		},
	});
});
