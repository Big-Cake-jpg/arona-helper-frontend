<template>
    <div class="mdui-prose max-w-3xl m-auto">
        <h1>设置</h1>
        <blockquote><h3>这里的东西都没写好，可以先看看样子……</h3></blockquote>
        <mdui-card class="md:w-90% p-5 w-100%">
            <h3>类别</h3>
            <h4>设置项</h4>
            <h4>设置项</h4>
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
        <mdui-card class="md:w-90% p-5 w-100% mt-5">
            <h3>关于</h3>
            <h4>阿罗娜小助手 配套前端服务</h4>
            <p>{{ appVersion }}</p>
            <p>Made with ❤️ by Big_Cake & GitHub Copilot.</p>
            <a href="https://beian.miit.gov.cn" target="_blank">晋 ICP 备 2024031556 号 - 1</a>
        </mdui-card>
    </div>
</template>

<script lang="ts">
import 'mdui/components/card.js'
import 'mdui/components/switch.js';
import { useTitle, useDark } from '@vueuse/core';
import { version } from '../../package.json';

useTitle("设置 - 阿罗娜小助手")

export default {
    data() {
        return {
            appVersion: `Ver.CN${version}`,
        };
    },
};
</script>