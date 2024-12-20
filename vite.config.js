/* eslint-disable no-undef */
import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePluginRadar } from "vite-plugin-radar";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
    plugins: [
        react(),
        VitePluginRadar({ analytics: { id: "G-JQBCWM4YT4" } }),
        ViteImageOptimizer(),
    ],
    resolve: {
        alias: {
            "@projects": path.resolve(__dirname, "src/assets/images/projects"),
            "@services": path.resolve(__dirname, "src/assets/images/services"),
            "@team": path.resolve(__dirname, "src/assets/images/team"),
        },
    },
    base: "./",
});
