<template>
    <div class="mdui-prose max-w-3xl m-auto">
        <h1>首页</h1>
        <p>欢迎使用好感度面板，该面板可以查询阿罗那小助手好感度相关信息。</p>
        <p>您可以在此查询一系列信息，包括但不限于「排名」、「好感度」、「等级」。</p>
        <p>登录以获得更好的体验！</p>
    </div>
    <div class="max-w-3xl m-auto mt-5 mb-5">
        <RouterLink to="/auth/login"><mdui-button>立刻登录<mdui-icon-account-circle
                    slot="icon"></mdui-icon-account-circle><mdui-icon-arrow-forward
                    slot="end-icon"></mdui-icon-arrow-forward></mdui-button></RouterLink>
    </div>
    <div class="mdui-prose max-w-3xl m-auto">
        <p>即使不登录，基础的查询功能依旧可用！Hooray！</p>
        <mdui-divider></mdui-divider>
    </div>
</template>

<script setup lang="ts">
import 'mdui/components/card.js';
import 'mdui/components/divider.js';
import 'mdui/components/button.js';
import 'mdui/components/avatar.js';
import '@mdui/icons/account-circle.js';
import '@mdui/icons/arrow-forward.js';
</script>