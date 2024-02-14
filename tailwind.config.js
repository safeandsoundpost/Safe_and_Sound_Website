/* eslint-disable */
/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: "#ffffff",
                    secondary: "#A9C2E0",
                    accent: "#5b8cc6",
                    neutral: "#0C2721",
                    "base-100": "#000000",
                    info: "#00ecff",
                    success: "#009d00",
                    warning: "#c13200",
                    error: "#ff6a7c",
                },
            },
        ],
    },
};
