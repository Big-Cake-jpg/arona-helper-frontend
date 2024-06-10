<template>
    <div class="max-w-3xl m-auto text-center">
        <div class="mdui-prose">
            <h1>登录</h1>
            <p>登录到您的账户，享受更多服务。</p>
            <mdui-divider></mdui-divider>
        </div>
        <loginCard />
        <div class="mdui-prose text-left max-w-3xl m-auto">
            <h2>如何登录？</h2>
            <p>请将在该页面获取到的登录代码复制到剪贴板，然后在有阿罗娜小助手的任意群内发送如下消息：</p>
            <pre><code>@阿罗娜小助手 login <你获取到的代码></code></pre>
            <p>如下图所示：</p>
        </div>
        <div class="mdui-prose my-5 max-w-3xl m-auto">
            <img src="/assets/login/result.webp" loading="lazy" class="h-48 shadow-md object-cover align-middle m-auto"
                alt="登录示例"></img>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useTitle } from '@vueuse/core';

useTitle("登录 - 阿罗娜小助手")
</script>
