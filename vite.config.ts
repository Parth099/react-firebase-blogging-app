import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    // output -> ./build/
    build: {
        outDir: "build",
    },
    base: "/react-firebase-blogging-app/",
    plugins: [react()],
});
