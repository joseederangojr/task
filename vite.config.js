import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import removeAttr from 'remove-attr';

console.log(import.meta.env)
// eslint-disable-next-line no-undef
const plugins = process.env.NODE_ENV === 'production' ? [removeAttr({
    extensions: ['tsx'],
    attributes: ['data-dusk']
})] : [];

console.log([
    laravel({
        input: "resources/js/app.tsx",
        refresh: true,
    }),
    react(),
    ...plugins
]);

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.tsx",
            refresh: true,
        }),
        react(),
        ...plugins
    ],
});
