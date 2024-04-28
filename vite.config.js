import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { info } from "/src/Constants/info.jsx";

const deployToGitHubPages = info.deployToGHPages;

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            "/login": "http://localhost:8000",
            "/login/session": "http://localhost:8000",
            "/connection": "http://localhost:8000",
            "/profession": "http://localhost:8000",
            "/job": "http://localhost:8000",
            "/technologies": "http://localhost:8000",
            "/profile": "http://localhost:8000",
            "/projects": "http://localhost:8000",
            "/videos": "http://localhost:8000",
            "/goals": "http://localhost:8000",
        },
    },
    plugins: [react()],
    base: deployToGitHubPages ? "/MatrixZone-APP/" : "/",
});
