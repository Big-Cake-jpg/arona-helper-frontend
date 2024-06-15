<template>
    <mdui-card class="p-5 my-10 sm:w-80%">
        <mdui-avatar src="/icon.webp"></mdui-avatar>
        <p class="mdui-prose">使用该一次性代码登录到您的账户。</p>
        <div>
            <mdui-text-field :disabled="isTimeUp" ref="textField" @click="copyCode" class="max-w-lg"
                :class="{ 'blur-field': isTimeUp || isFetchFailed }" readonly label="一次性代码"
                :value="logincode"><mdui-icon-code slot="icon"></mdui-icon-code></mdui-text-field>
            <div v-if="isTimeUp || isFetchFailed">
                <p class="mdui-prose" v-if="isTimeUp">一次性代码已过期，请重新获取。</p>
                <p class="mdui-prose" v-if="isFetchFailed">一次性代码获取失败，请重试。</p>
                <mdui-button @click="getLoginCode" :loading="isRefreshing"
                    :disabled="isRefreshButtonDisabled">重新获取<mdui-icon-refresh
                        slot="icon"></mdui-icon-refresh></mdui-button>
            </div>
            <p v-else>
                该代码将在 <b>{{ countdown }}</b> 秒后过期。
            </p>
            <p @click="showHelpDialog()" class="text-gray text-sm mdui-prose">无法登录？</p>
        </div>
    </mdui-card>
</template>

<script lang="ts">
import '@mdui/icons/code.js'
import '@mdui/icons/info--outlined.js'
import '@mdui/icons/refresh.js'
import { useClipboard } from '@vueuse/core'
import { useCookies } from '@vueuse/integrations/useCookies'
import axios from 'axios'
import 'mdui/components/card.js'
import 'mdui/components/text-field.js'
import { dialog } from 'mdui/functions/dialog.js'
import { snackbar } from 'mdui/functions/snackbar.js'
import { onBeforeUnmount, onMounted, onBeforeMount, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const countdown = ref(120)
        const isTimeUp = ref(false)
        const isFetchFailed = ref(false);
        const logincode = ref('')
        const { copy } = useClipboard()
        const textField = ref(null)
        const cookies = useCookies(['token'])
        const router = useRouter();
        const apiRoot = import.meta.env.VITE_API_ROOT
        const isRefreshButtonDisabled = ref(false)
        const isRefreshing = ref(false)
        let intervalId: number | null = null

        const copyCode = async () => {
            try {
                if (logincode.value) {
                    copy(logincode.value)
                }
                snackbar({
                    message: '复制成功',
                    closeable: true
                })
            } catch (err) {
                snackbar({
                    message: '复制失败，你的浏览器可能不受支持',
                    closeable: true
                })
            }
        }

        const showHelpDialog = () => {
            dialog({
                headline: '无法登录？',
                closeOnEsc: true,
                closeOnOverlayClick: true,
                body: '请检查您的网络连接是否正常，或者尝试重新获取登录代码。<br/>如果仍然无法登录，请加入 QQ 群联系我们。',
                actions: [
                    {
                        text: '获取帮助',
                        onClick: () => { window.open("https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=52ZKih_plrIdrn0X8OTaXnKPp9LgtqVs&authKey=yK1u5GClhphiEZ2LrERghmwXUiu%2B5K3zBYc%2FnFuYE%2FwPWYnhNIyawF1Aj26bLJZn&noverify=0&group_code=584380963") },
                    },
                    {
                        text: '我知道了'
                    }
                ]
            })
        }

        const getLoginCode = async () => {
            try {
                isRefreshButtonDisabled.value = true
                isRefreshing.value = true
                isFetchFailed.value = false
                const response = await axios.get(`${apiRoot}/account/login/code/get`)
                const data = await response.data
                logincode.value = data.data?.auth_code
                countdown.value = data.data?.exp
                isTimeUp.value = false

                const timer = setInterval(() => {
                    if (countdown.value > 0) {
                        countdown.value--
                    } else {
                        clearInterval(timer)
                        isTimeUp.value = true
                        isRefreshButtonDisabled.value = false
                        isRefreshing.value = false
                    }
                }, 1000)
            } catch (err) {
                snackbar({
                    message: '获取登录代码失败，请稍后重试',
                    closeable: true
                })
                console.error('获取登录代码失败，错误信息：', err)
                isFetchFailed.value = true
                isRefreshButtonDisabled.value = false
                isRefreshing.value = false
            }
        }

        const pollVerificationStatus = () => {
            intervalId = setInterval(async () => {
                try {
                    const response = await axios.get(`${apiRoot}/account/login/code/check`, {
                        params: { code: logincode.value }
                    })
                    if (response.status === 200) {
                        console.log("已获取到登录令牌")
                        cookies.set('token', response.data.data?.token, { path: '/', expires: new Date(response.data.data?.expire_on * 1000) })
                        snackbar({
                            message: '登录成功',
                            closeable: true
                        })
                        if (intervalId !== null) {
                            clearInterval(intervalId);
                            intervalId = null;
                        }
                        router.push('/');
                    }
                } catch (error) {
                }
            }, 5000) as number // 每 5 秒轮询一次
        }

        const checkLoginStatus = () => {
            try {
                const token = cookies.get('token')
                if (token) {
                    console.log("登录令牌存在，用户可能已登录")
                    snackbar({
                        message: '你已经登录过啦 ╰（‵□′）╯',
                        closeable: true,
                    })
                    router.push('/')
                }
            } catch (error) {
                console.error('无法检查登录状态，错误信息：', error)
            }
        }

        onMounted(async () => {
            watchEffect(() => {
                if (logincode.value) {
                    // @ts-expect-error
                    textField.value?.focus()
                }
            })

            try {
                getLoginCode();
            } catch (error) {
                snackbar({
                    message: '获取登录代码失败，请稍后重试',
                    closeable: true
                })
                console.error('获取登录代码失败，错误信息：', error)
                isTimeUp.value = true
                isRefreshButtonDisabled.value = false
                isRefreshing.value = false
            }

            pollVerificationStatus();
        })

        onBeforeMount(async () => {
            checkLoginStatus();
        })

        onBeforeUnmount(() => {
            if (intervalId !== null) {
                clearInterval(intervalId)
            }
        })

        return {
            countdown,
            isTimeUp,
            isFetchFailed,
            logincode,
            copyCode,
            showHelpDialog,
            textField,
            getLoginCode,
            pollVerificationStatus,
            isRefreshButtonDisabled,
            isRefreshing,
        }
    }
}
</script>

<style scoped>
.blur-field {
    filter: blur(2px);
    transition: filter 0.5s ease-in-out;
}
</style>
