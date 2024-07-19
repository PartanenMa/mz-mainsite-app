import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const deployToGitHubPages = false;
const deploy = false;
const apiUrl = deploy ? "deploy-url (COMING SOON)" : "http://localhost:8000";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            "/login": apiUrl,
            "/login/session": apiUrl,
            "/connection": apiUrl,
            "/profession": apiUrl,
            "/job": apiUrl,
            "/technologies": apiUrl,
            "/profile": apiUrl,
            "/projects": apiUrl,
            "/projects/:id": apiUrl,
            "/projects/pinned": apiUrl,
            "/videos": apiUrl,
            "/videos/:id": apiUrl,
            "/goals": apiUrl,
            "/reset": apiUrl,
        },
    },
    plugins: [react()],
    base: deployToGitHubPages ? "/mz-personalwebsite-app/" : "/",
});
