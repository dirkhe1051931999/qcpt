import react from '@astrojs/react';
import vue from '@astrojs/vue';
import starlight from '@astrojs/starlight';
import {defineConfig} from 'astro/config';
import path from 'path';

// https://astro.build/config
export default defineConfig({
  base: '/',
  vite: {
    resolve: {
      alias: {
        '@components': path.resolve('./src/components'),
      },
    },
  },
  integrations: [
    starlight({
      favicon: '/favicon.ico',
      title: {
        en: 'QCPT Documentation',
        'zh-CN': 'QCPT 文档',
      }, // 给用户提供一个编辑此网站的链接。
      editLink: {
        baseUrl: 'https://github.com/dirkhe1051931999/qcpt/tree/dev',
      }, // 是否禁用 自带的404 路由。
      disable404Route: true, // 为此网站设置英语为默认语言。
      defaultLocale: 'zh-cn',
      locales: {
        // 英文文档在 `src/content/docs/en/` 中。默认语言。
        en: {
          label: 'English',
          lang: 'en',
        }, // 简体中文文档在 `src/content/docs/zh-cn/` 中。
        'zh-cn': {
          label: '简体中文',
          lang: 'zh-CN',
        },
      },
      logo: {
        src: './src/assets/avatar.png',
        replacesTitle: true,
      },
      customCss: ['./src/styles/custom.css'],
      components: {
        Head: './src/components/Head.astro',
      },
      social: {
        github: 'https://github.com/dirkhe1051931999/qcpt/tree/dev',
      }, // 侧边栏
      sidebar: [
        {
          label: 'Getting Started',
          translations: {
            'zh-CN': '快速开始',
          },
          autogenerate: { directory: 'quick-start' },
        },
        {
          label: 'Components',
          translations: {
            'zh-CN': '组件',
          },
          items: [
            {
              label: 'Overview',
              translations: {
                'zh-CN': '组件概览',
              },
              link: '/zh-cn/components/',
            },
            {
              label: 'Form Components',
              translations: {
                'zh-CN': '表单组件',
              },
              autogenerate: { directory: 'components/form' },
            },
            {
              label: 'Data Display',
              translations: {
                'zh-CN': '数据展示',
              },
              autogenerate: { directory: 'components/data-display' },
            },
            {
              label: 'Charts',
              translations: {
                'zh-CN': '图表组件',
              },
              autogenerate: { directory: 'components/charts' },
            },
            {
              label: 'Utilities',
              translations: {
                'zh-CN': '工具组件',
              },
              autogenerate: { directory: 'components/utils' },
            },
          ],
        },
        {
          label: 'Utilities',
          translations: {
            'zh-CN': '工具函数',
          },
          autogenerate: { directory: 'utilities' },
        },
        {
          label: 'Styles',
          translations: {
            'zh-CN': '样式系统',
          },
          autogenerate: { directory: 'styles' },
        },
        {
          label: 'Theming',
          translations: {
            'zh-CN': '主题定制',
          },
          autogenerate: { directory: 'theming' },
        },
        {
          label: 'i18n',
          translations: {
            'zh-CN': '国际化',
          },
          autogenerate: { directory: 'i18n' },
        },
      ],
    }),
    react(),
    vue({
      appEntrypoint: '/src/lib/_app',
    }),
  ],
});
