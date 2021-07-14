import { defineUserConfig } from 'vuepress';
import type { DefaultThemeOptions } from 'vuepress';
import type { SidebarConfigArray, SidebarItem } from '@vuepress/theme-default';
import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';

const buildChildren = (path: string = '', parentName: string = ''): SidebarConfigArray => {
    return fs.readdirSync(path).map((file: string) => {
        const current: SidebarItem = { text: file, link: '', children: [] };
        if (file.startsWith('.') || file === 'README.md') return;
        const subPath: string = `${path}/${file}`;
        if (fs.statSync(subPath).isDirectory()) {
            current.children = buildChildren(subPath, `${parentName}/${file}`);
        } else {
            current.link = `${parentName}/${file}`;
        }
        return current;
    }).filter(config => config);
};

export default defineUserConfig<DefaultThemeOptions>({
    lang: 'zh-US',
    title: 'Johnny\'s blog',
    description: '认真分享和记录各类好文，逐步完善大前端知识体系。',
    themeConfig: {
        contributors: false,
        navbar: [
            { text: '文章目录', link: '/' },
            { text: 'LeetCode', link: 'https://hezhuoyi.github.io/leetcode' },
            { text: 'GitHub', link: 'https://github.com/hezhuoyi' },
        ],
        sidebar: buildChildren(path.join(process.cwd() + '/docs'))
    },
    head: [
        ['link', { rel: 'manifest', href: '/blog/manifest.webmanifest' }],
    ],
    base: '/blog/',
    plugins: [
        [
            '@vuepress/pwa',
            {
                skipWaiting: true,
            }
        ],
        [
            '@vuepress/plugin-search',
        ]
    ]
});