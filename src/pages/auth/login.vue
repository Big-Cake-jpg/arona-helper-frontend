<template>
    <div class="mdui-prose max-w-3xl m-auto text-center">
        <h1>登录</h1>
        <p>登录到您的账户，享受更多服务。</p>
        <mdui-divider></mdui-divider>
        <mdui-card class="p-5 mt-10 w-md">
            <mdui-avatar src="/icon.png"></mdui-avatar>
            <p>使用该一次性代码登录到您的账户。</p>
            <div>
                <mdui-text-field :disabled="isTimeUp" ref="logincode" @click="copyCode" class="max-w-lg" :class="{ 'blur-field': isTimeUp }"
                    readonly label="一次性代码" value="114514"><mdui-icon-code
                        slot="icon"></mdui-icon-code></mdui-text-field>
                <p v-if="isTimeUp">一次性代码已过期，请重新获取。</p>
                <p v-else>该代码将在 <b>{{ countdown }}</b> 秒后过期。</p>
            </div>
        </mdui-card>
    </div>
</template>

<script lang="ts">
import 'mdui/components/text-field.js';
import 'mdui/components/card.js';
import { snackbar } from 'mdui/functions/snackbar.js';
import '@mdui/icons/code.js';
import { useTitle, useClipboard } from '@vueuse/core';
import { ref, onMounted, watchEffect } from 'vue';

useTitle("登录 - 阿罗那小助手")

export default {
    setup() {
        const countdown = ref(120);
        const isTimeUp = ref(false);
        const logincode = ref(null)
        const { copy } = useClipboard();
        const copyCode = async () => {
                try {
                    if (logincode.value) {
                        // @ts-expect-error ts-plugin(2339)
                        await copy(logincode.value.value);
                    }
                    snackbar({
                        message: "复制成功。",
                        closeable: true,
                    });
                } catch (err) {
                    snackbar({
                        message: "复制失败，你的浏览器可能不受支持。",
                        closeable: true,
                    });
                }
            };
        onMounted(() => {
            watchEffect(() => {
                if (logincode.value) {
                    // @ts-expect-error ts-plugin(2339)
                    logincode.value.focus()
                } else {
                    
                }
            })

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
            isTimeUp,
            logincode,
            copyCode,
        }
    }
}
</script>

<style scoped>
.blur-field {
    filter: blur(2px);
}
</style>