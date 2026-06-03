import tailwindAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            screens: {
                // "3xl": "1900px",
                "2xl": "1536px",
                xxxs: "375px",
                xxs: "425px",
                xs: "550px",
            },
        },
    },
    variants: {
        extends: {
            animation: ["group-hover"],
        },
    },
    plugins: [tailwindAnimate],
};
