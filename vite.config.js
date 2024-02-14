/* eslint-disable no-undef */
import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@projects": path.resolve(__dirname, "src/assets/images/projects"),
        },
    },
});
