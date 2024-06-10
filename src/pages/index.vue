<template>
    <div class="mdui-prose max-w-3xl m-auto">
        <h1>首页 <mdui-badge variant="large">新版测试</mdui-badge></h1>
        <h2>欢迎回来！</h2>
        <p>欢迎使用阿罗娜机器人前端服务！</p>
        <p>目前还没有做什么实际功能，仅用于 UI 预览。</p>
        <blockquote><del>什么人啊这都，才写个 UI 都能写成屎山</del></blockquote>
        <p>登录以获得更好的体验！</p>
    </div>
    <div class="max-w-3xl m-auto mt-5 mb-5">
        <RouterLink to="/auth/login"><mdui-button>立刻登录<mdui-icon-account-circle
                    slot="icon"></mdui-icon-account-circle><mdui-icon-arrow-forward
                    slot="end-icon"></mdui-icon-arrow-forward></mdui-button></RouterLink>
    </div>
    <div class="mdui-prose max-w-3xl m-auto">
        <mdui-divider></mdui-divider>
    </div>
</template>

<script setup lang="ts">
import 'mdui/components/card.js';
import 'mdui/components/divider.js';
import 'mdui/components/button.js';
import 'mdui/components/badge.js';
import '@mdui/icons/account-circle.js';
import '@mdui/icons/arrow-forward.js';
import { useTitle } from '@vueuse/core';
import { useSeoMeta } from '@unhead/vue';
import { useCookies } from '@vueuse/integrations/useCookies.mjs';


const cookies = useCookies(['token']);
const token = cookies.get('token')

useTitle("首页 - 阿罗娜小助手")

useSeoMeta({
    title: '首页 - 阿罗娜小助手',
    description: 'QQ 机器人 阿罗娜小助手 配套前端服务',
    ogDescription: 'QQ 机器人 阿罗娜小助手 配套前端服务',
    ogTitle: '首页 - 阿罗娜小助手',
    ogImage: 'https://arona.lihaoyu.cn/icon.webp',
    // twitterCard: 'summary_large_image',
})

</script>