import vue from "@vitejs/plugin-vue";
import laravel from "laravel-vite-plugin";
import path from "path";
import { defineConfig } from "vite";
import vuetify from "vite-plugin-vuetify";

export default defineConfig({
    server: {
        port: 8080,
    },
    base: "./",
    build: {
        emptyOutDir: true,
        sourcemap: true,
    },
    plugins: [
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        vuetify({
            autoImport: true,
        }),
        laravel({
            input: ["resources/styles/style.scss", "resources/js/app.js"],
            refresh: true,
        }),
    ],
    resolve: {
        alias: {
            "@": path.join(__dirname, "resources/js"),
            "@/": `${path.resolve(__dirname, "resources/js")}/`,
            "@assets": `${path.resolve(__dirname, "resources/assets")}`,
            "@/assets": `${path.resolve(__dirname, "resources/assets")}/`,
            "@images": `${path.resolve(__dirname, "resources/images")}`,
            "@/images": `${path.resolve(__dirname, "resources/images")}/`,
            "@styles": `${path.resolve(__dirname, "resources/styles")}`,
            "@/styles": `${path.resolve(__dirname, "resources/styles")}/`,
            "@constants": `${path.resolve(
                __dirname,
                "resources/js/constants"
            )}`,
            "@/constants": `${path.resolve(
                __dirname,
                "resources/js/constants"
            )}/`,
            "~coreui": path.resolve(__dirname, "node_modules/@coreui/coreui"),
        },
    },
});
