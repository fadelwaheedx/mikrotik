import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './resources/js/setupTests.js',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            lines: 100,
            functions: 100,
            branches: 100,
            statements: 100,
            include: ['resources/js/Components/**/*.{jsx,tsx}', 'resources/js/Hooks/**/*.{jsx,tsx}'],
        },
    },
});
