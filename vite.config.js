import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            "/login": "http://localhost:8000",
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
    base: "/MatrixZone-APP/",
});
