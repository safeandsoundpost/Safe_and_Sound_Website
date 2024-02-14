module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    settings: { react: { version: "18.2" } },
    plugins: ["react-refresh"],
    rules: {
        indent: ["warn", 4, { SwitchCase: 1 }],
        "linebreak-style": ["warn", "unix"],
        quotes: ["error", "double"],
        semi: ["error", "always"],
        "react/jsx-no-target-blank": "off",
        "react-refresh/only-export-components": [
            "warn",
            { allowConstantExport: true },
        ],
    },
};
