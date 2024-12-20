/* eslint-disable no-undef */
import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePluginRadar } from "vite-plugin-radar";
// import Terminal from "vite-plugin-terminal";
// , Terminal({
//     console: "terminal",
//     output: ["console", "terminal"]
// })

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), VitePluginRadar({ analytics: { id: "G-JQBCWM4YT4" } })],
    resolve: {
        alias: {
            "@projects": path.resolve(__dirname, "src/assets/images/projects"),
            "@services": path.resolve(__dirname, "src/assets/images/services"),
            "@team": path.resolve(__dirname, "src/assets/images/team"),
        },
    },
    base: "./",
});
