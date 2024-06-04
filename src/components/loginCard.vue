<template>
  <mdui-card class="p-5 mt-10 sm:w-80%">
    <mdui-avatar src="/icon.png"></mdui-avatar>
    <p>使用该一次性代码登录到您的账户。</p>
    <div>
      <mdui-text-field
        :disabled="isTimeUp"
        ref="textField"
        @click="copyCode"
        class="max-w-lg"
        :class="{ 'blur-field': isTimeUp }"
        readonly
        label="一次性代码"
        :value="logincode"
        ><mdui-icon-code slot="icon"></mdui-icon-code
      ></mdui-text-field>
      <p v-if="isTimeUp">一次性代码已过期，请重新获取。</p>
      <p v-else>
        该代码将在 <b>{{ countdown }}</b> 秒后过期。
      </p>
      <p @click="showHelpDialog()" class="text-gray text-sm">无法登录？</p>
    </div>
  </mdui-card>
</template>

<script lang="ts">
import 'mdui/components/text-field.js'
import 'mdui/components/card.js'
import { snackbar } from 'mdui/functions/snackbar.js'
import { dialog } from 'mdui/functions/dialog.js'
import '@mdui/icons/code.js'
import '@mdui/icons/info--outlined.js'
import { ref, onMounted, watchEffect, nextTick } from 'vue'
import { useClipboard } from '@vueuse/core'
import axios from 'axios'

export default {
  setup() {
    const countdown = ref(120)
    const isTimeUp = ref(false)
    const logincode = ref('')
    const { copy } = useClipboard()
    const textField = ref(null)

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
        body: '请检查您的网络连接是否正常，或者尝试重新获取一次性代码。<br/>如果仍然无法登录，请加入 QQ 群联系我们。',
        actions: [
          {
            text: '我知道了'
          }
        ]
      })
    }

    onMounted(async () => {
      watchEffect(() => {
        if (logincode.value) {
          textField.value?.focus()
        } else {
        }
      })

      const timer = setInterval(() => {
        if (countdown.value > 0) {
          countdown.value--
        } else {
          clearInterval(timer)
          isTimeUp.value = true
        }
      }, 1000)

      try {
        const response = await axios.get('https://api-arona.230225.xyz/account/login/code/get')
        const data = await response.data
        logincode.value = data.auth_code
      } catch (err) {
        snackbar({
          message: '获取一次性代码失败，请稍后重试',
          closeable: true
        })
      }
    })

    return {
      countdown,
      isTimeUp,
      logincode,
      copyCode,
      showHelpDialog,
      textField
    }
  }
}
</script>

<style scoped>
.blur-field {
  filter: blur(2px);
}
</style>
