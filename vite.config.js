import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import { readFileSync, writeFileSync, existsSync } from 'fs';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      // rollupTypes 在处理重导出时可能有问题，保持关闭
      rollupTypes: false,
      tsconfigPath: './tsconfig.json',
      // 优化类型文件生成
      insertTypesEntry: true,
      copyDtsFiles: true,
      // 排除不必要的文件
      exclude: ['**/*.spec.ts', '**/*.test.ts', '**/tests/**'],
      // 静态导入，提升性能
      staticImport: true,
      // 清理输出目录
      cleanVueFileName: true,
      // 指定入口文件
      entryRoot: 'src',
      // 在类型文件生成后添加全局类型引用
      afterBuild: () => {
        const indexDtsPath = resolve(__dirname, 'dist/index.d.ts');
        if (existsSync(indexDtsPath)) {
          const content = readFileSync(indexDtsPath, 'utf-8');
          // 在文件开头添加对 global.d.ts 的引用
          const newContent = `/// <reference path="./global.d.ts" />\n${content}`;
          writeFileSync(indexDtsPath, newContent);
          console.log('✓ 类型声明文件已生成并添加全局类型引用');
        }
      },
      // 确保在构建完成前生成类型文件
      beforeWriteFile: (filePath, content) => {
        return { filePath, content };
      },
    }),
  ],
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
      components: resolve(__dirname, 'src/components'),
    },
  },
  build: {
    // 启用压缩 (esbuild 更快，terser 更小)
    minify: 'esbuild',
    // CSS 压缩
    cssMinify: true,
    // 启用 source map (可选，用于调试)
    sourcemap: false,
    lib: {
      // 指定打包入口文件
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        charts: resolve(__dirname, 'src/charts.ts'),
        resolver: resolve(__dirname, 'src/utils/resolver.ts'),
        'qcpt-styles': resolve(__dirname, 'src/qcpt-styles.js'),
      },
      // 包名，对应 package.json 中的 name
      name: 'qcpt',
      // 打包后的文件名
      fileName: (format, entryName) => {
        if (entryName === 'qcpt-styles') {
          return 'qcpt-styles.js';
        }
        if (entryName === 'charts') {
          return `charts.${format}.js`;
        }
        if (entryName === 'resolver') {
          // 生成 ESM 和 CJS 两种格式
          return format === 'es' ? 'resolver.mjs' : 'resolver.cjs';
        }
        return `qcpt.${format}.js`;
      },
    },
    cssCodeSplit: true, // 允许分割 CSS，按需加载
    rollupOptions: {
      // 确保外部化处理那些不想打包进库的依赖
      external: ['vue', 'quasar', 'chart.js', 'chart.js/auto'],
      output: {
        // 在 UMD/IIFE 构建模式下，为外部化的依赖提供全局变量
        globals: {
          vue: 'Vue',
          quasar: 'Quasar',
          'chart.js': 'Chart',
          'chart.js/auto': 'Chart',
        },
        // 优化输出文件名
        assetFileNames: (assetInfo) => {
          // CSS 文件命名
          if (assetInfo.name?.endsWith('.css')) {
            return '[name].css';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
      // 启用 Rollup treeshake
      treeshake: {
        moduleSideEffects: 'no-external',
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
    },
    // 优化 chunk 大小警告阈值
    chunkSizeWarningLimit: 1000,
  },
  // CSS 优化
  css: {
    postcss: {
      plugins: [
        // 可以添加 autoprefixer, cssnano 等插件
      ],
    },
  },
});
