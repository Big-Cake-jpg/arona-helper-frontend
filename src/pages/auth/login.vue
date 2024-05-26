<template>
    <div class="mdui-prose max-w-3xl m-auto text-center">
        <h1>登录</h1>
        <p>登录到您的账户，享受更多服务。</p>
        <mdui-divider></mdui-divider>
        <p>使用该一次性代码登录到您的账户。</p>
        <p v-if="isTimeUp">一次性代码已过期，请重新获取。</p>
        <mdui-text-field v-else class="max-w-lg" :class="{ 'blur-field': isTimeUp }" readonly label="一次性代码" value="114514"><mdui-icon-code
                slot="icon"></mdui-icon-code></mdui-text-field>
        <p>一次性代码剩余有效时间：{{ countdown }}</p>
    </div>
</template>

<script lang="ts">
import 'mdui/components/text-field.js';
import '@mdui/icons/code.js';
import { useTitle } from '@vueuse/core';
import { ref, onMounted } from 'vue';

export default {
    setup() {
        const countdown = ref(120);
        const isTimeUp = ref(false);

        onMounted(() => {
            const timer = setInterval(() => {
                if (countdown.value > 0) {
                    countdown.value--;
                } else {
                    clearInterval(timer);
                    isTimeUp.value = true;
                }
            }, 1000);
        });

        return {
            countdown,
            isTimeUp
        }
    }
}
</script>

<style scoped>
.blur-field {
    filter: blur(2px);
}
</style>