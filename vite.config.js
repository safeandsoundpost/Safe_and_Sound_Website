/* eslint-disable no-undef */
import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePluginRadar } from "vite-plugin-radar";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import Sitemap from "vite-plugin-sitemap";

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        VitePluginRadar({ analytics: { id: "G-JQBCWM4YT4" } }),
        ViteImageOptimizer(),
        // The app is a single page build, so the plugin can only discover "/".
        // Every other route has to be listed here or it never reaches the
        // sitemap. Keep in step with PAGE_SEO in src/utils/seo.js.
        Sitemap({
            hostname: "https://safeandsoundpost.com",
            dynamicRoutes: ["/projects", "/services", "/team", "/clients", "/reviews", "/contact", "/blog", "/horror-box"],
            changefreq: "monthly",
            priority: 0.7,
        }),
    ],
    resolve: {
        alias: {
            "@projects": path.resolve(__dirname, "src/assets/images/projects"),
            "@services": path.resolve(__dirname, "src/assets/images/services"),
            "@team": path.resolve(__dirname, "src/assets/images/team"),
        },
    },
    server: {
        // Allow temporary Cloudflare tunnels for private previews.
        allowedHosts: [".trycloudflare.com"],
    },
    base: "./",
});
