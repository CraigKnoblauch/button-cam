import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

function removeTestAssets() {
    return {
        name: 'remove-test-assets',
        resolveId (source) {
            return source === 'virtual-module' ? source : null
        },
        renderStart (outputOptions, inputOptions) {
            const outDir = outputOptions.dir
            const testAssetsDir = path.resolve(outDir, 'test')
            fs.rmdir(testAssetsDir, { recursive: true }, () => console.log(`Deleted ${testAssetsDir}`))
        }
    }
}

export default defineConfig({
    plugins: [removeTestAssets(), react()],
//    root: 'src/',
//    publicDir: '../public',
//    base: './',
    server: {
        host: true,
        open: true
    },
    build:
    {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: true
    },
    test: {
        include: ['./tests/**/*.test.js[x]'],
        browser: {
            provider: 'playwright', // 'webdriverio' | 'playwright'
            enabled: true,
            name: 'chromium', // browser name is required
            headless: true, // overridden in CLI
            viewport: { width: 800, height: 600 },
            providerOptions: {}
        }
    },
    resolve: {
        alias: {
            src: ('/src/')
        }
    },
    allowOnly: true,
    maxConcurrency: 1,
    minWorkers: 1,
    testTimeout: 5000,
    restoreMocks: true,
    sequence: {
      concurrent: false
    }
    /**
     * For the future, you can use resolve and alias to make your paths in your
     * source files work out. For reference:

  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
      assets: path.resolve(__dirname, './src/assets'),
      components: path.resolve(__dirname, './src/components'),
      lib: path.resolve(__dirname, './src/lib'),
      scenarios: path.resolve(__dirname, './src/scenarios'),
      testutils: path.resolve(__dirname, './src/tests/testutils')
    },
     */
})

