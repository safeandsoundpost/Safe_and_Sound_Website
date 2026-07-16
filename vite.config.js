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
        Sitemap({ hostname: "https://safeandsoundpost.com/" }),
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
