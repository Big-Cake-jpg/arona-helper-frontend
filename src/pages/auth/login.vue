<template>
    <div class="max-w-3xl m-auto text-center">
        <div class="mdui-prose">
            <h1>登录</h1>
        <p>登录到您的账户，享受更多服务。</p>
        <mdui-divider></mdui-divider>
        </div>
        <loginCard />
    </div>
</template>

<script lang="ts">
import { useTitle } from '@vueuse/core';

useTitle("登录 - 阿罗娜小助手")

export default {
    components: {
        loginCard: () => import('@/components/loginCard.vue')
    }
}
</script>
