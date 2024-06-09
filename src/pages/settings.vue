<template>
    <div class="mdui-prose max-w-3xl m-auto">
        <h1>设置</h1>
        <blockquote>
            <h3>这里的东西都没写好，可以先看看样子……</h3>
        </blockquote>
        <mdui-card class="p-5 w-100%">
            <h3>界面</h3>
            <div class="flex items-stretch justify-between">
                <div class="self-center">
                    <h4>深色模式</h4>
                </div>
                <mdui-switch></mdui-switch>
            </div>
            <div class="flex items-stretch justify-between">
                <div class="self-center">
                    <h4>显示 UID</h4>
                </div>
                <mdui-switch checked></mdui-switch>
            </div>
            <mdui-divider class="mt-3"></mdui-divider>
            <h3>类别</h3>
            <h4>设置项</h4>
            <h4>设置项</h4>
            <mdui-divider class="mt-3"></mdui-divider>
            <h3>类别</h3>
            <h4>设置项</h4>
            <h4>设置项</h4>
            <mdui-divider class="mt-3"></mdui-divider>
        </mdui-card>
        <mdui-card class="p-5 w-100% mt-5">
            <h3>关于</h3>
            <h4>阿罗娜小助手 配套前端服务</h4>
            <p>{{ appVersion }}</p>
            <p>Made with ❤️ by Big_Cake & GitHub Copilot.</p>
            <h4>相关链接</h4>
            <a href="https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=52ZKih_plrIdrn0X8OTaXnKPp9LgtqVs&authKey=yK1u5GClhphiEZ2LrERghmwXUiu%2B5K3zBYc%2FnFuYE%2FwPWYnhNIyawF1Aj26bLJZn&noverify=0&group_code=584380963"
                target="_blank">交流反馈 QQ 群</a> | <a href="https://github.com/Big-Cake-jpg/arona-helper-frontend"
                target="_blank">GitHub 仓库</a>
            <mdui-divider class="my-3"></mdui-divider>
            <a href="https://beian.miit.gov.cn" target="_blank">晋 ICP 备 2024031556 号 - 1</a>
        </mdui-card>
    </div>
</template>

<script lang="ts">
import 'mdui/components/card.js'
import 'mdui/components/switch.js';
import 'mdui/components/collapse.js';
import 'mdui/components/collapse-item.js';
import 'mdui/components/switch.js';
import { useTitle } from '@vueuse/core';
import { version } from '../../package.json';
import { useSeoMeta } from '@unhead/vue';

useSeoMeta({
    title: '设置 - 阿罗娜小助手',
    description: '有关前端服务的各项设置',
    ogDescription: '有关前端服务的各项设置',
    ogTitle: '设置 - 阿罗娜小助手',
    ogImage: 'https://arona.lihaoyu.cn/icon.webp',
    // twitterCard: 'summary_large_image',
})

useTitle("设置 - 阿罗娜小助手")

export default {
    data() {
        return {
            appVersion: `Ver.CN${version}`,
        };
    },
};
</script>