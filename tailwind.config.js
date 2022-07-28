/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                sp1: "#E7A117",
                sp2: "#C57F1E",
                sp3: "#2F3847",
                sp4: "#222832",
                sp5: "#addae1",
            },
            width: {
                88: "22rem",
                176: "44rem",
                288: "72rem",
            },
        },
    },
    plugins: [],
};
