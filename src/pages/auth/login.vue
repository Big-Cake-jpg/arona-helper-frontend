<template>
    <div class="mdui-prose max-w-3xl m-auto text-center">
        <h1>登录</h1>
        <p>登录到您的账户，享受更多服务。</p>
        <mdui-divider></mdui-divider>
        <loginCard />
    </div>
</template>

<script lang="ts">
import { useTitle } from '@vueuse/core';

useTitle("登录 - 阿罗那小助手")

export default {
    components: {
        loginCard: () => import('@/components/loginCard.vue')
    }
}
</script>
