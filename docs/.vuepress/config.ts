import { defineUserConfig } from 'vuepress';
import type { DefaultThemeOptions } from 'vuepress';

export default defineUserConfig<DefaultThemeOptions>({
  lang: 'zh-US',
  title: 'Johnny\'s blog',
  description: '认真分享和记录各类好文，逐步完善大前端知识体系。',
  themeConfig: {
    contributors: false,
    lastUpdated: false,
    docsDir: 'docs',
    sidebarDepth: 1,
    navbar: [
      { text: '深入JavaScript', link: '/JavaScript/' },
      { text: '计算机网络',link: '/Network/' },
      { text: '浏览器', link: '/Browser/' },
      { text: '框架', link: '/Framework/' },
      { text: '工程化', link: '/Engineering/' },
      { text: '新技术', link: '/NewTechnology/' },
      { text: 'LeetCode', link: 'https://hezhuoyi.github.io/leetcode' },
      { text: 'GitHub', link: 'https://github.com/hezhuoyi' },
      { text: '掘金', link: 'https://juejin.cn/user/3597257778155703' },
    ],
    sidebar: {
      '/JavaScript/': [
        {
          text: '深入JavaScript',
          children: [
            '/JavaScript/README.md',
            '/JavaScript/JS执行机制.md',
            '/JavaScript/JS进阶语法.md',
            '/JavaScript/作用域和闭包.md',
            '/JavaScript/模块化.md',
            '/JavaScript/手写系列.md',
          ],
        },
      ],
      '/Network/': [
        {
          text: '计算机网络',
          children: [
            '/Network/README.md',
            '/Network/编译原理.md',
            '/Network/计算机原理.md',
            '/Network/设计模式.md',
            '/Network/HTTP.md',
            '/Network/HTTPS.md',
            '/Network/RPC.md',
            '/Network/网络安全.md',
          ],
        },
      ],
      '/Browser/': [
        {
          text: '浏览器相关',
          children: [
            '/Browser/README.md',
            '/Browser/浏览器工作原理.md',
            '/Browser/浏览器性能优化.md',
            '/Browser/浏览器缓存.md',
            '/Browser/从输入URL到页面呈现.md',
          ],
        },
      ],
      '/Framework/': [
        {
          text: '框架和类库',
          children: [
            '/Framework/README.md',
            {
              text: 'Vue',
              children: [
                '/Framework/Vue/Vue相关.md',
              ]
            },
            {
              text: 'React',
              children: [
                '/Framework/React/React相关.md',
              ]
            },
            {
              text: 'TypeScript',
              children: [
                '/Framework/TypeScript/深入理解TS.md',
                '/Framework/TypeScript/TS类型系统.md',
              ]
            },
            {
              text: '数据流管理',
              children: [
                '/Framework/数据流管理/状态管理工具.md',
              ]
            },
            {
              text: '小程序',
              children: [
                '/Framework/小程序/运行机制.md',
              ]
            },
            {
              text: 'RN',
              children: [
                '/Framework/RN/运行机制.md',
                '/Framework/RN/启动流程.md',
                '/Framework/RN/性能优化.md',
                '/Framework/RN/新架构.md',
              ]
            },
            {
              text: 'Flutter',
              children: [
                '/Framework/Flutter/核心原理.md',
                '/Framework/Flutter/UI系统.md',
              ]
            },
          ],
        },
      ],
      '/Engineering/': [
        {
          text: '前端工程化',
          children: [
            '/Engineering/README.md',
            '/Engineering/主流打包工具对比.md',
            '/Engineering/Webpack相关.md',
          ],
        },
      ],
      '/NewTechnology/': [
        {
          text: '新技术/方向',
          children: [
            '/NewTechnology/README.md',
            '/NewTechnology/微前端.md',
            '/NewTechnology/PWA.md',
            '/NewTechnology/Vite.md',
            '/NewTechnology/Web Components.md',
          ],
        },
      ],
    },
  },
  head: [
    ['link', { rel: 'manifest', href: '/blog/manifest.webmanifest' }],
  ],
  base: '/blog/',
  plugins: [
    ['@vuepress/pwa', { skipWaiting: true }],
    ['@vuepress/plugin-search', { locales: { '/': { placeholder: 'Search' }}}]
  ]
});